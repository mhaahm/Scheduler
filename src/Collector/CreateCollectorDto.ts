import {Category} from "../entity/Category.entity";

export class CreateCollectorDto
{
    readonly id: number;
    readonly colParams: Array<object>;
    readonly title: string;
    readonly script:string;
    readonly description: string;
    readonly category: Category;
    creation_date: string = (new Date()).toString();
}