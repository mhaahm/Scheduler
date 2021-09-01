import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Res,
  HttpStatus,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateCollectorDto } from './CreateCollectorDto';
import { CollectorService } from './collector.service';
import { Response } from 'express';
import globalConfig from '../../globalConfig';

@Controller('collector')
export class CollectorController {
  constructor(private readonly collectroService: CollectorService) {}
  @Post('/create')
  create(@Body() createCollector: CreateCollectorDto, @Res() res: Response) {
    this.collectroService
      .saveUser(createCollector)
      .then((resp) => {
        res.status(HttpStatus.CREATED).send();
      })
      .catch((error) => {
        res.status(HttpStatus.NOT_MODIFIED).send();
      });
  }

  @Get('/collectorListType')
  getCollectorType() {
    return globalConfig.collectorType;
  }

  @Get('/list')
  getAllCollector() {
    return this.collectroService.getAllCollector();
  }
  @Get('/getCollector')
  getSingleCollector(@Param('id') id: string) {
    return this.collectroService.getSingleCollector(id);
  }

  @Delete('/remove/:id')
  removeCollector(@Param() id: number, @Res() res: Response) {
    return this.collectroService
      .removeCollector(id)
      .then(() => {
        res.status(HttpStatus.OK).send();
      })
      .catch(() => {
        res.status(HttpStatus.NOT_MODIFIED).send();
      });
  }
}
