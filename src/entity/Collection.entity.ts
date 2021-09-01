import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TransfertMod } from './TransfertMod.entity';
import { Collector } from './Collector.entity';

@Entity()
export class Collection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => TransfertMod)
  transfertMode: TransfertMod;

  @Column(`json`)
  params: any;

  @ManyToOne(() => Collector)
  collector: Collector;

  @Column()
  nbRetry: number;
}
