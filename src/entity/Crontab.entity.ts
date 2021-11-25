import {
  Column,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { Collection } from './Collection.entity';

@Entity()
export class Crontab {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  name: string;

  @Column('json')
  config: any;

  @ManyToMany(() => Collection, { cascade: true })
  @JoinTable()
  collections: Collection[];
}
