import {Controller, Get, Query, Post, Body} from '@nestjs/common';
import {CreateCollectorDto} from "./CreateCollectorDto";
import {getConnection} from "typeorm";

@Controller('collector')
export class CollectorController {

    @Post("/create")
    create(@Body() createCollector: CreateCollectorDto) {
        console.log(createCollector);

        return 'This action adds a new cat';
    }
}

