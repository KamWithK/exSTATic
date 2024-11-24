import * as browser from "webextension-polyfill";
import type { InstanceDetails, Stat } from "../storage/instance_storage";

export interface DataEntry {
  client?: string;
  uuid: string;
  name: string;
  given_identifier: string;
  type: string;
  date: string;
  time_read?: number;
  chars_read?: number;
  lines_read?: number;
  [key: string]: unknown;
}

export async function getDateData(date: string): Promise<DataEntry[]> {
  const uuids = (await browser.storage.local.get(date))[date];

  const date_data = uuids.map(async ([client, uuid]: [string, string]) => {
    const details = (await browser.storage.local.get(uuid))[uuid];

    const uuid_date_key = JSON.stringify([client, uuid, date]);
    let stats_entry =
      (await browser.storage.local.get(uuid_date_key))[uuid_date_key] ?? {};

    // Processed stats
    if (stats_entry.hasOwnProperty("time_read")) {
      stats_entry["time_read"] = stats_entry["time_read"];

      if (stats_entry.hasOwnProperty("chars_read")) {
        stats_entry["read_speed"] =
          stats_entry["chars_read"] / stats_entry["time_read"];
      }
    }

    return {
      client: client,
      uuid: uuid,
      name: details["name"],
      given_identifier: details["given_identifier"],
      type: details["type"],
      date: date,
      ...stats_entry,
    };
  });

  return Promise.all(date_data);
}

export async function getData(): Promise<DataEntry[]> {
  const dates = await browser.storage.local.get("immersion_dates");

  if (!dates.hasOwnProperty("immersion_dates")) {
    return [];
  }

  const data = await Promise.all(dates["immersion_dates"].map(getDateData));

  return data.flat();
}

export async function getInstanceData([uuid, details]: [
  string,
  InstanceDetails,
]) {
  if (!details.hasOwnProperty("last_line_added")) {
    return;
  }

  const id_queries = [...Array(details["last_line_added"] + 1).keys()].map(
    (index) => JSON.stringify([uuid, index]),
  );
  const lines = await browser.storage.local.get(id_queries);

  return Object.values(lines).map((line) => {
    return {
      uuid: uuid,
      given_identifier: details["given_identifier"],
      name: details["name"],
      line: typeof line === "string" ? line : line[0],
      time: typeof line === "string" ? undefined : line[1],
    };
  });
}
