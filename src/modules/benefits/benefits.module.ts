import { Module } from '@nestjs/common';
import { config } from 'dotenv';
import { HttpModule } from 'src/shared/common/axios/httpServer.module';
import { SearchModule } from 'src/shared/common/elastic/elastic.module';
import { CacheRedisModule } from 'src/shared/common/redis/redis.module';
import { BenefitsController } from './controllers/benefits.controller';
import { BenefitsService } from './services/benefits.service';

config();

@Module({
  controllers: [BenefitsController],
  providers: [BenefitsService],
  imports: [CacheRedisModule, HttpModule, SearchModule],
  exports: [BenefitsService],
})
export class BenefitsModule {}
