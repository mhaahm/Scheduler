import {Entity, Column, PrimaryGeneratedColumn, Index,OneToMany} from "typeorm";
import {Collector} from "./Collector.entity";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    @Index({unique: true})
    name:string;

    @OneToMany(() => Collector, collector => collector.category)
    collectors: Collector[];
}
