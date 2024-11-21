import { timeNowSeconds } from "../calculations";
import type {
  InstanceDetails,
  InstanceStorage,
} from "../storage/instance_storage";
import { MediaStorage } from "../storage/media_storage";

// EXTENDED STORAGE SPEC
// NOTE: Each volume will register with a seperate UUID but can be tied together through a series name
//     "uuid": {
//         "series": "",
//         "last_char_count": "page_id",
//         ...
//     },
//     ["uuid", "date"]: {
//         "pages_read": 0
//         ...
//     }

export interface TTUDetails extends InstanceDetails {
  last_char_count: number;
}

export class TTUStorage extends MediaStorage<TTUDetails> {
  static async build(live_stat_update = false) {
    const media_storage = await super.buildMediaStorage("ttu");

    await this.setPages(media_storage?.instance_storage);

    if (!media_storage.type_storage.properties.hasOwnProperty("afk_max_time"))
      await media_storage.type_storage.updateProperties({ afk_max_time: 120 });

    return new TTUStorage(
      media_storage.type_storage,
      media_storage.instance_storage,
      live_stat_update,
    );
  }

  static async setPages(instance_storage?: InstanceStorage<TTUDetails>) {
    if (instance_storage && !instance_storage.details.last_char_count) {
      await instance_storage.updateDetails({ last_char_count: 0 });
    }
  }

  async changeInstance(new_uuid?: string, given_identifier?: string) {
    await super.changeInstance(new_uuid, given_identifier);
    await TTUStorage.setPages(this.instance_storage);
  }

  async pauseChange(last_char_count: number) {
    await this.instance_storage?.updateDetails({
      last_char_count: last_char_count,
    });
    this.stop_ticker();
  }

  async processText(chars_read: number, date: string) {
    const stats = {
      chars_read: chars_read - (this.details?.last_char_count ?? 0),
    };

    await this.instance_storage?.addDailyStats(date, stats);

    if (chars_read > (this.details?.last_char_count ?? 0))
      this.start_ticker(false);
    else if (chars_read < (this.details?.last_char_count ?? 0))
      this.stop_ticker();

    await this.instance_storage?.updateDetails({
      last_char_count: chars_read,
      last_active_at: timeNowSeconds(),
    });

    await this.instance_storage?.addToDates(date);
    await this.instance_storage?.addToDate(date);
  }
}
