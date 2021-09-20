import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
} from 'typeorm';
import { Category } from './Category.entity';

@Entity()
export class Collector {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  title: string;

  @Column('text')
  script: string;

  @Column('text')
  description: string;

  @Column('json')
  colParams: any;

  @Column('datetime')
  creation_date: string;

  @ManyToOne(() => Category, (category) => category.collectors)
  category: Category;

  @Column()
  collectorType: number;

  @Column()
  isStandardOutData: boolean;
}
