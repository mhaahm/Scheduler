import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CollectorController } from './Collector/collector.controller';
import { CategoryController } from './Category/category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { CollectorService } from './Collector/collector.service';
import { Collector } from './entity/Collector.entity';
import { Category } from './entity/Category.entity';
import { CategoryService } from './Category/category.service';
import { join } from 'path';
import { AppService } from './app.service';
import { ConsoleModule } from '@squareboat/nest-console';
import { DefaultDataService } from './Commands/DefaultData.service';
import { TransfertMod } from './entity/TransfertMod.entity';
import { Collection } from './entity/Collection.entity';
import { CollectionController } from './collections/collection.controller';
import { CollectionLauncher } from './Commands/CollectionLauncher';
import { BullModule } from '@nestjs/bull';
import { CollectionProduces } from './Services/collection.producer.service';
import { CollectionConsumer } from './Services/collection.consumer';
import { SocketModule } from './socket/socket.module';
import { AppGateway } from './app.gateway';
import { ScheduleModule } from '@nestjs/schedule';
import { Crontab } from './entity/Crontab.entity';
import { CrontabService } from './Services/crontab.service';
import { JobsService } from './Services/jobs.services';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      // New
      rootPath: join(__dirname, '..', 'client'), // New
    }),
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([
      Collector,
      Category,
      Collection,
      TransfertMod,
      Crontab,
    ]),
    ConsoleModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    ScheduleModule.forRoot(),
    BullModule.registerQueue({
      name: 'collectionQue',
      settings: {
        lockDuration:  90000, // Key expiration time for job locks.
        lockRenewTime: 45000, // Interval on which to acquire the job lock
        stalledInterval: 30000, // How often check for stalled jobs (use 0 for never checking).
        maxStalledCount:  1, // Max amount of times a stalled job will be re-processed.
        guardInterval: 5000, // Poll interval for delayed jobs and added jobs.
        retryProcessDelay:   5000, // delay before processing next job in case of internal error.
        backoffStrategies: {}, // A set of custom backoff strategies keyed by name.
        drainDelay:  5 // A timeout for when the queue is in drained state (empty waiting for jobs).
      }
    }),
    SocketModule,
  ],
  controllers: [
    AppController,
    CollectorController,
    CategoryController,
    CollectionController,
  ],
  providers: [
    AppService,
    CollectorService,
    CategoryService,
    DefaultDataService,
    CollectionLauncher,
    CollectionProduces,
    CollectionConsumer,
    AppGateway,
    CrontabService,
    JobsService,
  ],
})
export class AppModule {
  public async onModuleDestroy(): Promise<void> {
    // <---- THIS METHOD NOT AWAITED
  }
}
