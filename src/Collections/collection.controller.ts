import {
  Controller,
  Post,
  Res,
  Body,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { CreateCollectionDto } from './CreateCollectionDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from '../entity/Collection.entity';
import { Response } from 'express';
import SchedulerLoger from '../Services/SchedulerLoger';
import { TransfertMod } from '../entity/TransfertMod.entity';

@Controller('collection')
export class CollectionController {
  private logger = new SchedulerLoger();
  constructor(
    @InjectRepository(Collection)
    private collectionRepository: Repository<Collection>,
    @InjectRepository(TransfertMod)
    private transfertModRepository: Repository<TransfertMod>,
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

  @Get('/transfertMods')
  async getTransfertMod() {
    return await this.transfertModRepository.find();
  }

  @Delete('/delete/:id')
  async deleteCollection(@Param('id') id: number) {
    return await this.collectionRepository.delete(id);
  }

  @Get('/launchCollection')
  launchCollection(@Param('id') id: string) {
    
  }
}
