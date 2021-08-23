import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ServeStaticModule} from '@nestjs/serve-static';
import { CollectorController } from './Collector/collector.controller';
import { CategoryController } from './Category/category.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import config from "ormconfig";
import {CollectorService} from "./Collector/collector.service";
import {Collector} from "./entity/Collector.entity";
import {Category} from "./entity/Category.entity";
import {CategoryService} from "./Category/category.service";
import { join } from "path";
import {AppService} from "./app.service";



@Module({
  imports: [
    ServeStaticModule.forRoot({ // New
      rootPath: join(__dirname, '..', 'client'), // New
    }),
    TypeOrmModule.forRoot(config),
      TypeOrmModule.forFeature([Collector,Category])
  ],
  controllers: [AppController, CollectorController,CategoryController],
  providers: [AppService,CollectorService,CategoryService],
})
export class AppModule {

}
