import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Collector } from '../entity/Collector.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateCollectorDto } from './CreateCollectorDto';

@Injectable()
export class CollectorService {
  constructor(
    @InjectRepository(Collector)
    private collectorRepository: Repository<Collector>,
  ) {}
  saveUser(
    createCollectorDto: CreateCollectorDto,
  ): Promise<Collector | UpdateResult> {
    try {
      createCollectorDto.creation_date = new Date().toString();
      if (createCollectorDto.id) {
        return this.collectorRepository.update(
          createCollectorDto.id,
          createCollectorDto,
        );
      } else {
        const collector = this.collectorRepository.create(createCollectorDto);
        return this.collectorRepository.save(collector);
      }
    } catch (e) {
      throw e;
    }
  }

  async getAllCollector() {
    return await this.collectorRepository.find({ relations: ['category'] });
  }

  /**
   *
   * @param id
   */
  async getSingleCollector(id: string): Promise<Collector> {
    return await this.collectorRepository.findOneOrFail(id, {
      relations: ['category'],
    });
  }

  /**
   *
   * @param id
   */
  async removeCollector(id: number): Promise<DeleteResult> {
    return await this.collectorRepository.delete(id);
  }
}
