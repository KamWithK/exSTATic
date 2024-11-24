import { charsInLine, timeNowSeconds, lineSplitCount } from "../calculations";
import type {
  InstanceDetails,
  InstanceStorage,
  Stat,
} from "../storage/instance_storage";
import { MediaStorage } from "../storage/media_storage";

// EXTENDED STORAGE SPEC
// NOTE: Each volume will register with a seperate UUID but can be tied together through a series name
//     "uuid": {
//         "series": "",
//         "last_page_read": "page_id",
//         ...
//     },
//     ["uuid", "date"]: {
//         "pages_read": 0
//         ...
//     }

export interface MokuroDetails extends InstanceDetails {
  last_page_read: number;
  series: string;
  page_count: number;
}

export interface MokuroStat extends Stat {
  pages_read: number;
}

export class MokuroStorage extends MediaStorage<MokuroDetails> {
  static async build(live_stat_update = false) {
    const media_storage = await super.buildMediaStorage("mokuro");

    await MokuroStorage.setPages(media_storage.instance_storage);

    if (!media_storage.type_storage.properties.afk_max_time)
      await media_storage.type_storage.updateProperties({ afk_max_time: 120 });

    return new MokuroStorage(
      media_storage.type_storage,
      media_storage.instance_storage,
      live_stat_update,
    );
  }

  static async setPages(instance_storage?: InstanceStorage<MokuroDetails>) {
    if (instance_storage && !instance_storage.details.last_page_read) {
      await instance_storage.updateDetails({ last_page_read: 0 });
    }
  }

  async setDetails(series: string, page_count: number) {
    if (this.details?.series === undefined) {
      this.instance_storage?.updateDetails({ series: series });
    }

    if (this.details?.page_count !== page_count) {
      this.instance_storage?.updateDetails({ page_count: page_count });
    }
  }

  async changeInstance(new_uuid?: string, given_identifier?: string) {
    await super.changeInstance(new_uuid, given_identifier);
    await MokuroStorage.setPages(this.instance_storage);
  }

  async processPage(page_num: number, lines: string[], date: string) {
    let stats: Partial<MokuroStat> = {
      chars_read: lines.reduce((total, line) => total + charsInLine(line), 0),
      lines_read: lines.reduce(
        (total, line) => total + lineSplitCount(line),
        0,
      ),
      pages_read: Math.abs(page_num - (this.details?.last_page_read ?? 0)),
    };

    if (page_num > this.details!.last_page_read) {
      await this.instance_storage?.addDailyStats(date, stats);
      this.start_ticker(false);
    } else if (page_num < this.details!.last_page_read) {
      await this.instance_storage?.subDailyStats(date, stats);
      this.stop_ticker();
    }

    await this.instance_storage?.updateDetails({
      last_page_read: page_num,
      last_active_at: timeNowSeconds(),
    });
    await this.instance_storage?.addToDates(date);
    await this.instance_storage?.addToDate(date);
  }
}
