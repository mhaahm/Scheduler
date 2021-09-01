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

@Module({
  imports: [
    ServeStaticModule.forRoot({
      // New
      rootPath: join(__dirname, '..', 'client'), // New
    }),
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([Collector, Category, Collection, TransfertMod]),
    ConsoleModule,
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
  ],
})
export class AppModule {}
