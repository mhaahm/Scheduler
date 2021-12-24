import { ConsoleLogger, LoggerService } from '@nestjs/common';
import globalConfig from '../../globalConfig';
import { writeFileSync, mkdirSync } from 'fs';
import * as path from 'path';

export default class SchedulerLoger extends ConsoleLogger implements LoggerService {
  readonly fileLog: string;
  constructor(logParam?: string) {
    super();
    if (logParam) {
      this.fileLog = logParam;
      console.log(this.fileLog);
    } else {
      this.fileLog = globalConfig.logFile;
    }
    mkdirSync(path.dirname(this.fileLog), { recursive: true });
  }
  debug(message: any, context?: string): any {
    super.debug(message);
    this.writeToFile(message, context);
  }

  error(message: any, trace?: string, context?: string): any {
    super.error(message);
    this.writeToFile(message, context);
  }

  log(message: any, context?: string): any {
    super.log(message);
    this.writeToFile(message, context);
  }

  verbose(message: any, context?: string): any {
    super.verbose(message);
    this.writeToFile(message, context);
  }

  warn(message: any, context?: string): any {
    super.warn(message);
    this.writeToFile(message, context);
  }

  getCurrentDate(): string {
    const date = new Date();
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }

  writeToFile(message: any, context?: string): void {
    if (typeof context == 'undefined') {
      context = '';
    }
    writeFileSync(
      this.fileLog,
      '[' + this.getCurrentDate() + ']  ' + context + '    ' + message + '\n',
      { flag: 'a+' },
    );
  }
}
