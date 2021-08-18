import { Module } from '@nestjs/common';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';
import { ServeStaticModule} from '@nestjs/serve-static';
import { CollectorController } from './Collector/collector.controller';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [
    ServeStaticModule.forRoot({ // New
      rootPath: __dirname+'/..'+'/client/dist', // New
    }),
    TypeOrmModule.forRoot()
  ],
  controllers: [ CollectorController],
  providers: [],
})
export class AppModule {}
