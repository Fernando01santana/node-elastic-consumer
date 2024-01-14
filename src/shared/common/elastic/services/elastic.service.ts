import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { config } from 'dotenv';
import { ElasticGenericError } from 'src/shared/exceptions/elastic.exception';
config();

@Injectable()
export class ElasticService {
  constructor(
    private readonly configService: ConfigService,
    private readonly esService: ElasticsearchService,
  ) {}

  public async createIndex(data: any): Promise<boolean> {
    const index = process.env.ELASTICSEARCH_INDEX;
    const status = true;
    try {
      const indexExists = await this.esService.indices.exists({ index });
      if (!indexExists) {
        await this.esService.indices.create({
          index,
          body: { data },
        });

        console.log(`Índice "${index}" criado com sucesso.`);
        return status;
      }
      return !status;
    } catch (error) {
      console.error(`Erro ao criar o índice:`, error);
      throw error;
    }
  }

  public async indexPost(post: any): Promise<any> {
    return this.esService.index({
      index: this.configService.get('ELASTICSEARCH_INDEX')!,
      body: post,
    });
  }

  public async remove(postId: number): Promise<any> {
    // Retorne a promise diretamente, sem usar await aqui
    return this.esService.deleteByQuery({
      index: this.configService.get('ELASTICSEARCH_INDEX')!,
      body: {
        query: {
          match: {
            id: postId,
          },
        },
      },
    });
  }

  public async searchBenefits(document: string): Promise<any> {
    const index = this.configService.get('ELASTICSEARCH_INDEX')!;
    const searchParams = {
      index,
      body: {
        query: {
          term: {
            'data.document': document,
          },
        },
      },
    };

    try {
      const response = await this.esService.search(searchParams);

      if (response.body.hits.hits.length > 0) {
        return response.body.hits.hits.map((hit) => hit._source.data);
      }
      return;
    } catch (error) {
      throw new ElasticGenericError();
    }
  }
}
