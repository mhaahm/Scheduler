import { TransfertMod } from '../entity/TransfertMod.entity';
import { Collector } from '../entity/Collector.entity';

export class CreateCollectionDto {
  readonly id: number;
  readonly params: Array<object>;
  readonly title: string;
  readonly transfertMode: TransfertMod;
  readonly collector: Collector;
  readonly nbRetry: number;
}
