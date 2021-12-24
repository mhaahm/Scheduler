import { CollectorTypeInterface } from './CollectorTypeInterface';
import globalConfig from '../../../globalConfig';
import { CollectorType } from './CollectorType';
import { Collector } from '../../entity/Collector.entity';
import * as fs from 'fs';

export class PHP extends CollectorType implements CollectorTypeInterface {
  constructor(collector: Collector) {
    super(collector);
  }
  createLauncherFile(params): string {
    const file = this.createScriptFile();
    const launcherFile = this.dir + '/Launcher_' + Math.ceil(Math.random() * 100000) + '.bat';
    fs.writeFileSync(launcherFile, 
      `@echo off \n 
        php ${file} ${params} 
        If %errorlevel% NEQ 0 (
          echo "collection done with error"
        ) else (
          echo "collection done success "
        )
        exit %errorlevel%
    `);
    return launcherFile;
  }


  /**
   * create script file
   * @return: string
   */
  createScriptFile(): string {
    const script = this.collector.script;
    const file =
      this.dir + '/Script_' + Math.ceil(Math.random() * 100000) + '.php';
    fs.writeFileSync(file, this.collector.script);
    return file;
  }
}
