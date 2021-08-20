import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Collector} from "../entity/Collector.entity";
import {Repository} from "typeorm";
import {CreateCollectorDto} from "./CreateCollectorDto";

@Injectable()
export class CollectorService
{
    constructor(@InjectRepository(Collector) private collectorRepository: Repository<Collector>) {
    }
    saveUser(createCollectorDto: CreateCollectorDto): Promise<Collector>
    {
        createCollectorDto.creation_date = (new Date()).toString();
        const collector = this.collectorRepository.create(createCollectorDto);
        return this.collectorRepository.save(collector);
    }

    async getAllCollector() {
        return await this.collectorRepository.find();
    }
}