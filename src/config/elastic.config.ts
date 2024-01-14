import { ElasticsearchModuleOptions } from '@nestjs/elasticsearch';

export const createElasticsearchConfig =
  async (): Promise<ElasticsearchModuleOptions> => {
    return {
      node: 'http://localhost:9200',
    };
  };
