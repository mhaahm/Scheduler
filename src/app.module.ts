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

@Module({
  imports: [
    ServeStaticModule.forRoot({
      // New
      rootPath: join(__dirname, '..', 'client'), // New
    }),
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([Collector, Category, Collection, TransfertMod]),
    ConsoleModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'collectionQue',
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
  ],
})
export class AppModule {
  public async onModuleDestroy(): Promise<void> {
    // <---- THIS METHOD NOT AWAITED
  }
}
