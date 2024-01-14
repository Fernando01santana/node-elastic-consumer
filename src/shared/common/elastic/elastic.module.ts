import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { createElasticsearchConfig } from 'src/config/elastic.config';
import { ElasticService } from './services/elastic.service';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      useFactory: async () => await createElasticsearchConfig(),
    }),
  ],
  providers: [ElasticService],
  exports: [ElasticsearchModule, ElasticService],
})
export class SearchModule {}
