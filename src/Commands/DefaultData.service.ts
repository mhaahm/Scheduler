import { Injectable } from '@nestjs/common';
import { Command, CommandArguments, _cli } from '@squareboat/nest-console';
import { Repository } from 'typeorm';
import { TransfertMod } from '../entity/TransfertMod.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager } from 'typeorm';

@Injectable()
export class DefaultDataService {
  readonly defaultData: any = {
    transfertMod: [
      {
        name: 'FTP',
        config: {},
      },
      {
        name: 'SSL',
        config: {},
      },
      {
        name: 'EMAIL',
        config: { mail: 'moham.hassen@gmail.com' },
      },
    ],
  };
  constructor(
    @InjectRepository(TransfertMod)
    private transfertModRepository: Repository<TransfertMod>,
  ) {}
  @Command('scheduler:default-data', {
    desc: 'Command for insert default data',
    args: {},
  })
  async addDefaultData(args: CommandArguments) {
    await this.addTransfertMod();
  }

  async addTransfertMod() {
    _cli.info('Inject default data to transfert mod table');
    const entityManager = getManager();
    for (const transfert of this.defaultData.transfertMod) {
      _cli.success('Treatment of  ' + transfert.name);
      const transfertFromBase = await entityManager.findOne(TransfertMod, {
        name: transfert.name,
      });
      if (!transfertFromBase) {
        await getManager().save(this.transfertModRepository.create(transfert));
      } else {
        _cli.success('Transfert mod ' + transfert.name + ' exist in databases');
        transfertFromBase.config = transfert.config;
        await getManager().save(transfertFromBase);
      }
    }
  }
}
