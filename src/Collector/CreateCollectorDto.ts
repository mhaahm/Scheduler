export class CreateCollectorDto
{
    readonly ColParams: Array<object>;
    readonly optional:boolean;
    readonly title: string;
    readonly script:string;
    readonly description: string;
    readonly category: number;
}