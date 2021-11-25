import {
  Controller,
  Post,
  Res,
  Body,
  Get,
  Delete,
  Param,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { CreateCollectionDto } from './CreateCollectionDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from '../entity/Collection.entity';
import { Response } from 'express';
import SchedulerLoger from '../Services/SchedulerLoger';
import { TransfertMod } from '../entity/TransfertMod.entity';
import { CollectionProduces } from '../Services/collection.producer.service';
import { Request } from 'express';
import { CrontabService } from '../Services/crontab.service';
import { Crontab } from '../entity/Crontab.entity';

@Controller('collection')
export class CollectionController {
  private logger = new SchedulerLoger();
  constructor(
    @InjectRepository(Collection)
    private collectionRepository: Repository<Collection>,
    @InjectRepository(TransfertMod)
    private transfertModRepository: Repository<TransfertMod>,
    private readonly collectionProducer: CollectionProduces,
    private readonly crontabService: CrontabService,
    @InjectRepository(Crontab) private crontabRepository: Repository<Crontab>,
  ) {}

  @Post('/addNew')
  addCollection(
    @Body() collectionDto: CreateCollectionDto,
    @Res() res: Response,
  ) {
    const collection = this.collectionRepository.create(collectionDto);
    if (collection.id) {
      this.logger.log('Update collection');
      this.collectionRepository
        .update(collection.id, collectionDto)
        .then(() => {
          res.status(200);
          res.send('Update donne successfully');
        })
        .catch((error) => {
          this.logger.error(
            'Update collection error ' + error,
            'Collection save',
          );
          res.status(500);
          res.send('Update donne with error ' + error);
        });
    } else {
      this.logger.log('Save collection');
      this.collectionRepository
        .save(collection)
        .then(() => {
          res.status(200);
          res.send('Save donne successfully');
        })
        .catch((error) => {
          this.logger.error(
            'Save collection error ' + error,
            'Collection save',
          );
          res.status(500);
          res.send('Save donne with error ' + error);
        });
    }
  }
  @Get('/getCollection')
  getSingleCollector(@Param('id') id: string) {
    return this.collectionRepository.findOne(id, {
      relations: ['collector', 'transfertMode'],
    });
  }

  @Get('/list')
  async getAllCollection() {
    return await this.collectionRepository.find({ relations: ['collector'] });
  }

  @Post('/scheduleCollection')
  async scheduleCollection(@Req() req: Request, @Res() res: Response) {
    const params = req.body;
    const ressave = await this.crontabService.saveJobs(params);
    return res.json({ res: ressave ? 'success' : 'error' });
  }

  @Get('/transfertMods')
  async getTransfertMod() {
    return await this.transfertModRepository.find();
  }

  @Delete('/delete/:id')
  async deleteCollection(@Param('id') id: number) {
    return await this.collectionRepository.delete(id);
  }

  @Get('/launchCollection/:id')
  launchCollection(@Param('id') id: string, @Res() res: Response) {
    try {
      this.collectionProducer.addJobToLaunch(parseInt(id));
      return res.status(HttpStatus.OK).json(['Success']);
    } catch (e) {
      return res.status(HttpStatus.NOT_MODIFIED).json([e.toString()]);
    }
  }

  @Get('/listCrontab')
  async getAllCrontab() {
    return await this.crontabRepository.find({ relations: ['collections'] });
  }

  @Delete('/deleteCrontab/:id')
  async deleteCrontab(@Param('id') id: number) {
    return await this.crontabRepository.delete(id);
  }

  @Get('/launchcrontab/:id')
  async launchcrontab(@Param('id') id: string, @Res() res: Response) {
    const crontab = await this.crontabRepository.findOne(id, {
      relations: ['collections'],
    });
    try {
      for (const job in crontab.collections) {
         await this.collectionProducer.addJobToLaunch(crontab.collections[job].id);
      }
      return res.status(HttpStatus.OK).json(['Success']);
    } catch (e) {
      return res.status(HttpStatus.NOT_MODIFIED).json([e.toString()]);
    }
  }
}
