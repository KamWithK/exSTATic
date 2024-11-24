import * as browser from "webextension-polyfill";
import { charsInLine, dateNowString, lineSplitCount } from "../calculations";
import type { InstanceStorage, Stat } from "../storage/instance_storage";
import { MediaStorage } from "../storage/media_storage";
import type { TypeStorage } from "../storage/type_storage";

// EXTENDED STORAGE SPEC
//     "uuid": {
//         "last_line_added": "line_id",
//         ...
//     }

export class VNStorage extends MediaStorage {
  max_lines: number;

  constructor(
    type_storage: TypeStorage,
    instance_storage?: InstanceStorage,
    live_stat_update = false,
  ) {
    super(type_storage, instance_storage, live_stat_update);
    this.max_lines = Number.parseInt(type_storage.properties.max_loaded_lines);
    this.logLines();
  }

  static async build(live_stat_update = false) {
    const media_storage = await super.buildMediaStorage("vn");
    return new VNStorage(
      media_storage.type_storage,
      media_storage.instance_storage,
      live_stat_update,
    );
  }

  async logLines() {
    if (!this.uuid || !this.details || !this.instance_storage) return;

    const event = new CustomEvent("media_changed", {
      detail: {
        uuid: this.uuid,
        name: this.details.name,
        lines: await this.instance_storage.getLines(this.max_lines),
      },
    });
    document.dispatchEvent(event);
  }

  async addLine(line: string, date: string, time: number) {
    const previous_line_key = JSON.stringify([
      this.uuid,
      this.details!.last_line_added,
    ]);
    const previous_line = (await browser.storage.local.get(previous_line_key))[
      previous_line_key
    ];

    if (previous_line == undefined || line != previous_line[0]) {
      const chars_in_line = charsInLine(line);
      if (chars_in_line === 0) return;

      this.start_ticker(false);

      await this.instance_storage?.insertLine(line, time);

      await this.instance_storage?.addToDates(date);
      await this.instance_storage?.addToDate(date);
      await this.instance_storage?.addDailyStats(date, {
        lines_read: lineSplitCount(line),
        chars_read: chars_in_line,
      });

      const event = new CustomEvent("new_line", {
        detail: {
          line_id: this.details!.last_line_added,
          line: line,
          time: time,
        },
      });
      document.dispatchEvent(event);
    }
  }

  async deleteLines(details: [[number, string, string]]) {
    let date_stats: { [date: string]: Partial<Stat> } = {};

    details.forEach(([, line, date]: [number, string, string]) => {
      if (date === undefined) {
        date = dateNowString();
      }

      const date_stat = date_stats[date];

      if (!date_stat) {
        date_stats[date] = { lines_read: 0, chars_read: 0 };
      }

      date_stats[date].lines_read =
        date_stat.lines_read ?? 0 + lineSplitCount(line);
      date_stats[date].chars_read =
        date_stat.chars_read ?? 0 + charsInLine(line);
    });

    await this.instance_storage?.deleteLines(
      details.map(([line_id, ,]) => line_id),
    );
    await this.instance_storage?.subStats(date_stats);
  }

  async deleteLine(line_id: number, line: string, date: string) {
    await this.instance_storage?.deleteLine(line_id);
    await this.instance_storage?.subDailyStats(date, {
      lines_read: lineSplitCount(line),
      chars_read: charsInLine(line),
    });
  }
}
