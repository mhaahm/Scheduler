import {Controller, Get, Query, Post, Body} from '@nestjs/common';
import {CreateCollectorDto} from "./CreateCollectorDto";
import {getConnection} from "typeorm";
import {CollectorService} from "./collector.service";

@Controller('collector')
export class CollectorController {

    constructor(private readonly collectroService: CollectorService) {
    }
    @Post("/create")
    create(@Body() createCollector: CreateCollectorDto) {
        console.log(createCollector);
        this.collectroService.saveUser(createCollector);
        return 'This action adds a new cat';
    }

    @Get("/list")
    getAllCollector()
    {
        return this.collectroService.getAllCollector();
    }
}

