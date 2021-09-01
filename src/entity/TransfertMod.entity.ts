import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';
import { Collector } from './Collector.entity';
import { Collection } from './Collection.entity';

@Entity()
export class TransfertMod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  name: string;

  @Column('json')
  config: any;
}
