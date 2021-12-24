import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class JobsService {
  constructor(@InjectQueue('collectionQue') private queue: Queue) {}

  async getAllQueueJobs() {
    const jobs = await this.queue.getJobs([
      'active',
      'completed',
      'delayed',
      'failed',
      'waiting',
    ]);
    
    console.log(this.queue.getCompleted());
    console.log(this.queue.getFailed());
    return jobs;
  }
}
