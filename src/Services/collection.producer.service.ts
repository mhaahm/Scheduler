import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class CollectionProduces {
  constructor(@InjectQueue('collectionQue') private queue: Queue) {}

  /**
   * @param collectionId
   */
  async addJobToLaunch(collectionId: number) {
    console.log('Collection id '+collectionId);
    await this.queue.add('collection-launcher',{
      jobId: collectionId
    });
  }
}
