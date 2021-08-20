export class CreateCollectorDto
{
    readonly colParams: Array<object>;
    readonly title: string;
    readonly script:string;
    readonly description: string;
    readonly category: number;
    creation_date: string = (new Date()).toString();
}