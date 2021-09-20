import { Injectable } from '@nestjs/common';
import { _cli, Command, CommandArguments } from '@squareboat/nest-console';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from '../entity/Collection.entity';
import globalConfig from '../../globalConfig';
import { PHP } from '../Collector/Types/PHP';
import { CollectorTypeInterface } from '../Collector/Types/CollectorTypeInterface';
import SchedulerLoger from '../Services/SchedulerLoger';
import { appendFileSync, existsSync, mkdirSync } from 'fs';
import * as helper from '../Services/Helpers';
import * as fs from 'fs';
import * as runner from 'child_process';
import Helpers from '../Services/Helpers';

@Injectable()
export class CollectionLauncher {
  private collection: Collection;
  private collectionManager: CollectorTypeInterface;
  private logger: SchedulerLoger;
  private dirlog: string;
  private dirData: string;

  constructor(
    @InjectRepository(Collection)
    private collectionRepository: Repository<Collection>,
  ) {
    this.dirlog = globalConfig.tempDir + 'CollectionLogs/';
    if (!existsSync(this.dirlog)) {
      mkdirSync(this.dirlog, { recursive: true });
    }
    this.dirData = globalConfig.tempDir + 'CollectionData/';
    if (!existsSync(this.dirData)) {
      mkdirSync(this.dirData, { recursive: true });
    }
  }

  @Command('scheduler:launcher', {
    desc: 'Command for collection execution',
    args: {
      colId: { desc: 'Collection id to execute', req: true, alias: 'colId' },
    },
  })
  async launchCollecte(args: CommandArguments) {
    const id = args.colId;
    _cli.info('Launch command id : ' + id);
    _cli.info('Extract collection from databases');
    const collection = await this.collectionRepository.findOne(id.toString(), {
      relations: ['collector', 'transfertMode'],
    });
    if (!collection) {
      _cli.error('Collection with id =' + id + ' is not in databases');
      return;
    }
    const logFile =
      this.dirlog +
      collection.collector.title +
      '/' +
      helper.default.getDateString() +
      '.log';
    this.logger = new SchedulerLoger(logFile);
    this.logger.log('Launching of collection ' + collection.title);
    _cli.success('Collection exist in databases');
    this.logger.log('Collection exist in databases');
    this.collection = collection;
    const dataFile = this.dirData + Helpers.createDataFileName(collection);
    const colParam = this.buildCollectionParams(dataFile);
    const collectionType = this.getCollectionType();
    _cli.info('The type of collection to launch is : ' + collectionType);
    this.logger.log('The type of collection to launch is : ' + collectionType);
    _cli.info(`Create ${collectionType} collection manager `);
    this.createCollectionManager();
    const launcher = this.collectionManager.createLauncherFile(colParam);
    _cli.info(`The collection file launcher is ${launcher}`);
    this.logger.log(`The collection file launcher is ${launcher}`);
    if (process.platform !== 'win32') {
      fs.chmodSync(launcher, '0777');
    }
    const out = fs.openSync(
      collection.collector.isStandardOutData ? dataFile : logFile,
      'a',
    );
    _cli.info(`The data file name : ${dataFile}`);
    this.logger.log(`The data file name : ${dataFile}`);
    const ps = runner.execSync(launcher);
    fs.writeSync(out, ps.toString());
    // send file per mail or per ssl
    this.sendCollectionFile([dataFile, logFile]);
    //Helpers.main();
  }

  /**
   * buildCollectionParams: build collection params
   *
   * @param dataFile
   */
  buildCollectionParams(dataFile: string): string {
    let paramStr = '';
    const paramsDef = this.collection.collector.colParams;
    const paramsValue = this.collection.params;
    for (const param of paramsValue) {
      if (param.value == '' && !param.optional) {
        _cli.error(
          'Param ' + param.name + ' is not optional and his value is empty',
        );
        return '';
      }
      if (paramStr != '') {
        paramStr += ' ';
      }
      if (param.prefix != '') {
        paramStr += param.prefix;
      }
      if (paramStr != '') {
        paramStr += ' ';
      }
      paramStr += param.value;
    }
    if (!this.collection.collector.isStandardOutData) {
      paramStr += '-outFile ' + dataFile;
    }
    return paramStr;
  }

  getCollectionType() {
    const collectionTypeId = this.collection.collector.collectorType;
    const allTypes = globalConfig.collectorType;
    for (const collectorType of allTypes) {
      if (collectorType.id === collectionTypeId) {
        return collectorType.name;
      }
    }
    return '';
  }

  createCollectionManager(): void {
    const type = this.getCollectionType();
    switch (type.toUpperCase()) {
      case 'PHP':
        this.collectionManager = new PHP(this.collection.collector);
      default:
        return null;
    }
  }

  sendCollectionFile(files: string[]) {
    const transfertMod = this.collection.transfertMode.name;

    switch (transfertMod) {
      case 'EMAIL':
        _cli.info('Send collection file per mail');
        const messageContent = `Hello              
                                Attached is the ${
                                  this.collection.collector.title
                                } collection file
                                Launched on date ${Helpers.getDateString()}`;
        Helpers.sendMail(files, messageContent);
        break;
      case 'FTP':
        break;
      case 'SSL':
        break;
    }
  }
}
