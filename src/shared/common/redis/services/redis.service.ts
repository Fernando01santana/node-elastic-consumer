import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { BenefitsResponseDto } from '../../axios/dto/benefits.dto';

@Injectable()
export class CacheReadService {
  private readonly logger = new Logger(CacheReadService.name);

  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async readInformationFromCache(key: string): Promise<BenefitsResponseDto> {
    try {
      const data = await this.cacheManager.get<BenefitsResponseDto>(key);
      if (data) {
        this.logger.log(`Dados lidos do cache com a chave '${key}'.`);
        return data;
      }

      return;
    } catch (error) {
      this.logger.error(`Chave nao encontrada'${key}': ${error.message}`);
    }
  }

  async addInformationToCache(key: string, data: any): Promise<void> {
    try {
      const existingData = await this.cacheManager.get(key);
      if (existingData) {
        this.logger.warn(`Chave '${key}' já existe no cache.`);
        return;
      }

      await this.cacheManager.set(key, data);
      this.logger.log(`Dados adicionados ao cache com a chave '${key}'`);
    } catch (error) {
      this.logger.error(
        `Chave adicionada encontrada'${key}': ${error.message}`,
      );
    }
  }
}
