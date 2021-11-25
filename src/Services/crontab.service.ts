import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import SchedulerLoger from './SchedulerLoger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Crontab } from '../entity/Crontab.entity';
import { Collection } from '../entity/Collection.entity';

@Injectable()
export class CrontabService {
  private logger = new SchedulerLoger();

  constructor(
    private scheduleregistry: SchedulerRegistry,
    @InjectRepository(Crontab)
    private crontabRepository: Repository<Crontab>,
    @InjectRepository(Collection)
    private collectionRepository: Repository<Collection>,
  ) {
    /*const name = 'Test';
    const job = new CronJob(`01 * * * * *`, () => {
      this.logger.warn(`time (01) for job ${name} to run!`);
    });
    this.scheduleregistry.addCronJob(name, job);
    job.start();*/
  }

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
    };
    crontab.collections = [];
    for (let i = 0; i < params.jobsid.length; i++) {
      const collection = await this.collectionRepository.findOne(
        params.jobsid[i],
        {
          relations: ['collector', 'transfertMode'],
        },
      );
      crontab.collections.push(collection);
    }

    //console.log(params)
    const cron = this.crontabRepository.create(crontab);
    try {
      if (update) {
        await this.crontabRepository.update(crontab.id, cron);
      } else {
        await this.crontabRepository.save(cron);
      }
      return true;
    } catch (e) {
      console.log('Error save crontab ', e);
      return false;
    }
  }

  enableCronsJobs() {}
}
