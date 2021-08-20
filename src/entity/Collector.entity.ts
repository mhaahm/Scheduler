import {Entity,Column,PrimaryGeneratedColumn,} from "typeorm";

@Entity()
export class Collector {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title:string;

    @Column("text")
    script: string;

    @Column("text")
    description: string

    @Column()
    category: number;

    @Column("json")
    colParams: any;

    @Column("datetime")
    creation_date: string;
}