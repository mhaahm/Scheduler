import { Collector } from '../../entity/Collector.entity';
import globalConfig from '../../../globalConfig';
import { existsSync, mkdirSync } from 'fs';
import Helpers from '../../Services/Helpers';

export class CollectorType {
  public dir: string;
  constructor(public collector: Collector) {
    const d_string = Helpers.getDateString();
    this.dir =
      globalConfig.tempDir + 'Collections/' + collector.title + '/' + d_string;
    if (!existsSync(this.dir)) {
      mkdirSync(this.dir, { recursive: true });
    }
  }
}
