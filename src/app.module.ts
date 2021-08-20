import { Module } from '@nestjs/common';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';
import { ServeStaticModule} from '@nestjs/serve-static';
import { CollectorController } from './Collector/collector.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import config from "ormconfig";
import {CollectorService} from "./Collector/collector.service";
import {Collector} from "./entity/Collector.entity";


@Module({
  imports: [
    ServeStaticModule.forRoot({ // New
      rootPath: __dirname+'/..'+'/client/dist', // New
    }),
    TypeOrmModule.forRoot(config),
      TypeOrmModule.forFeature([Collector])
  ],
  controllers: [ CollectorController],
  providers: [CollectorService],
})
export class AppModule {

}
