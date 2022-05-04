import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import SchedulerLoger from './SchedulerLoger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Crontab } from '../entity/Crontab.entity';
import { Collection } from '../entity/Collection.entity';
import { CollectionProduces } from './collection.producer.service';

@Injectable()
export class CrontabService {
  private logger = new SchedulerLoger();

  constructor(
    private scheduleregistry: SchedulerRegistry,
    @InjectRepository(Crontab)
    private crontabRepository: Repository<Crontab>,
    @InjectRepository(Collection)
    private collectionRepository: Repository<Collection>,
    private readonly collectionProducer: CollectionProduces,
  ) {}

  /**
   *
   * @param id
   */
  async saveJobs(params: any): Promise<boolean> {
    let crontab = await this.crontabRepository.findOne({
      where: {
        name: params.title,
      },
    });
    let update = true;
    if (!crontab) {
      crontab = new Crontab();
      update = false;
    }

    crontab.name = params.title;
    crontab.config = {
      second: '*',
      minute: params.minute,
      hour: params.hour,
      day_month: params.day_month,
      month: params.month,
      day_week: params.day_week,
      free_config: params.free_config,
    };
    crontab.collections = [];
   // console.log(params);
    for (let i = 0; i < params.collections.length; i++) {
      const collection = await this.collectionRepository.findOne(
        params.collections[i].id,
        {
          relations: ['collector', 'transfertMode'],
        },
      );
  
      crontab.collections.push(collection);
    }
    
    //console.log(params)
    const cron = await this.crontabRepository.create(crontab);
    try {
      if (update) {
        await Object.assign(cron, crontab); 
        await this.crontabRepository.update(crontab.id, cron);
      } else {
        await this.crontabRepository.save(cron);
      }
      this.enableCronsJobs();
      return true;
    } catch (e) {
      console.log('Error save crontab ', e);
      return false;
    }
  }

  async enableCronsJobs() {
    // get all crontabs
    // for each crontab job create crontab instance
    const crontabs = await this.crontabRepository.find();
    crontabs.forEach((crontab) => {
      const collectionId = crontab.id;
      const name = crontab.name;
      const config = crontab.config;
      let cron_config = `00 ${config.minute} ${config.hour} ${config.day_month} ${config.month} ${config.day_week}`;
      if (
        typeof config.free_config !== 'undefined' &&
        config.free_config !== ''
      ) {
        cron_config = config.free_config;
      }
      const job = new CronJob(cron_config, () => {
        this.collectionProducer.addJobToLaunch(collectionId);
      });
      this.scheduleregistry.addCronJob(name, job);
      job.start();
    });
  }
}
