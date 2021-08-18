import {Entity,Column,PrimaryGeneratedColumn,} from "typeorm";

export class Collector {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title:string;

    @Column("text")
    script: string;

    @Column("text")
    desciption: string

    @Column()
    category: number;

    @Column()
    $colParams: Array<object>

    @Column()
    optional: boolean;
}