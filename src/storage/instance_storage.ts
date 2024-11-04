import { dateNowString } from "../calculations";

import { Mutex } from "async-mutex";
import * as browser from "webextension-polyfill";

// STORAGE SPEC
// {
//     "uuid": {
//         "name": "",
//         ...
//     },
//     ["client", "uuid", "date"]: {
//         "lines_read": 0,
//         "chars_read": 0,
//         "time_read": 0,
//         ...
//     },
//     ["uuid", "line_id"]: "line",
//     "immersion_dates": ["date"],
//     "date": [["client", "uuid"]]
// }

export interface InstanceDetails {
  given_identifier: string;
  last_active_at: number;
  last_line_added: number;
  name: string;
  type: string;
}

export interface Stat {
  chars_read: number;
  lines_read?: number;
  time_read: number;
}

export class InstanceStorage<
  TDetails extends InstanceDetails = InstanceDetails,
> {
  uuid: string;
  mutex: Mutex;
  client: string;
  details: TDetails;
  today_stats: Stat;

  constructor(
    uuid: string,
    client: string,
    details: TDetails,
    today_stats: Stat,
  ) {
    this.uuid = uuid;
    this.mutex = new Mutex();
    this.client = client;
    this.details = details;
    this.today_stats = today_stats;
  }

  static async buildInstance(uuid: string) {
    const client = (await browser.storage.local.get("client"))["client"];

    const rawDetails = await browser.storage.local.get(uuid);
    const details = rawDetails.hasOwnProperty(uuid) ? rawDetails[uuid] : {};

    const uuid_date_key = JSON.stringify([uuid, dateNowString()]);
    const today_stats = (await browser.storage.local.get(uuid_date_key))[
      uuid_date_key
    ];

    return new InstanceStorage(uuid, client, details, today_stats);
  }

  async updateDetails(details: Partial<TDetails | InstanceDetails>) {
    Object.assign(this.details, details);
    await browser.storage.local.set({ [this.uuid]: this.details });
  }

  async setDailyStats(date: string, values: Stat, from_client?: string) {
    const uuid_date_key = JSON.stringify([
      from_client ?? this.client,
      this.uuid,
      date,
    ]);
    let daily_stats_entry = await browser.storage.local.get(uuid_date_key);

    daily_stats_entry[uuid_date_key] = values;
    if (date == dateNowString()) {
      this.today_stats = daily_stats_entry[uuid_date_key];
    }

    await browser.storage.local.set(daily_stats_entry);
  }

  async addStats(
    date_stat_adds: { [date: string]: Partial<Stat> },
    multiple = 1,
  ) {
    return this.mutex.runExclusive(async () =>
      this.#addStats(date_stat_adds, multiple),
    );
  }

  async #addStats(
    date_stat_adds: { [date: string]: Partial<Stat> },
    multiple = 1,
    from_client?: string,
  ) {
    const date_keys = Object.keys(date_stat_adds).map((date) =>
      JSON.stringify([from_client ?? this.client, this.uuid, date]),
    );
    let date_stats = await browser.storage.local.get(date_keys);

    date_keys.forEach((key) => {
      let date = JSON.parse(key)[2];

      if (!date_stats.hasOwnProperty(key)) {
        date_stats[key] = {};
      }

      Object.entries(date_stat_adds[date]).forEach(([stat, value]) => {
        if (!date_stats[key].hasOwnProperty(stat)) {
          date_stats[key][stat] = 0;
        }

        date_stats[key][stat] += value * multiple;
      });

      if (date == dateNowString()) {
        this.today_stats = date_stats[key];
      }
    });

    await browser.storage.local.set(date_stats);
  }

  async addDailyStats(date: string, values: Partial<Stat>, multiple = 1) {
    await this.addStats({ [date]: values }, multiple);
  }

  async subStats(
    date_stat_adds: { [date: string]: Partial<Stat> },
    multiple = 1,
  ) {
    await this.addStats(date_stat_adds, -1 * multiple);
  }

  async subDailyStats(date: string, values: Partial<Stat>, multiple = 1) {
    await this.addDailyStats(date, values, -1 * multiple);
  }

  async insertLine(line: string, time: number) {
    const line_key = JSON.stringify([
      this.uuid,
      this.details.last_line_added + 1,
    ]);
    let line_entry = { [line_key]: [line, time] };

    await this.updateDetails({
      last_line_added: this.details.last_line_added + 1,
      last_active_at: time,
    });

    await browser.storage.local.set(line_entry);
  }

  async deleteLine(line_id: number) {
    await browser.storage.local.remove(JSON.stringify([this.uuid, line_id]));
  }

  async deleteLines(line_ids: number[]) {
    await browser.storage.local.remove(
      line_ids.map((line_id) => JSON.stringify([this.uuid, line_id])),
    );
  }

  async getLines(max_lines?: number) {
    if (!this.details.last_line_added) {
      return;
    }

    // NOTE: This doesn't account for deleted lines
    const max_line_id = this.details.last_line_added;
    const min_line_id =
      max_lines === undefined || max_lines <= 0 || isNaN(max_lines)
        ? 0
        : Math.max(0, this.details.last_line_added - max_lines + 1);

    const id_queries = [...Array(max_line_id - min_line_id + 1).keys()].map(
      (index) => JSON.stringify([this.uuid, min_line_id + index]),
    );
    const lines: { [key: string]: [string, number] | string } =
      await browser.storage.local.get(id_queries);

    return Object.entries(lines).map(([key, line_data]) => {
      let line = typeof line_data === "string" ? line_data : line_data[0];
      let time = typeof line_data === "string" ? undefined : line_data[1];
      let [uuid, id] = JSON.parse(key);

      return [uuid, id, line, time];
    });
  }

  async addToDates(date: string) {
    let day_entries = await browser.storage.local.get("immersion_dates");

    if (!day_entries.hasOwnProperty("immersion_dates")) {
      day_entries["immersion_dates"] = [];
    }

    if (!day_entries["immersion_dates"].includes(date)) {
      day_entries["immersion_dates"].push(date);
      await browser.storage.local.set(day_entries);
    }
  }

  async addToDate(date: string, from_client?: string) {
    let day_entries = await browser.storage.local.get(date);

    if (!day_entries.hasOwnProperty(date)) {
      day_entries[date] = [];
    }

    const client_uuid = [from_client ?? this.client, this.uuid];
    const exists = day_entries[date].some(
      (current: [string, string]) =>
        current[0] === client_uuid[0] && current[1] === client_uuid[1],
    );

    if (!exists) {
      day_entries[date].push(client_uuid);
      await browser.storage.local.set(day_entries);
    }
  }
}
