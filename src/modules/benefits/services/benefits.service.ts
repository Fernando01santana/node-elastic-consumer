import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import {
  BenefitsResponseDto,
  RequestBenefitsDto,
} from 'src/shared/common/axios/dto/benefits.dto';
import { HttpService } from 'src/shared/common/axios/services/httpServer';
import { ElasticService } from 'src/shared/common/elastic/services/elastic.service';
import { CacheReadService } from 'src/shared/common/redis/services/redis.service';
import { HttpServerException } from 'src/shared/exceptions/httpServer.exception';
import { AuthResponse } from '../dtos/benefits.dto';

config();
@Injectable()
export class BenefitsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly redisService: CacheReadService,
    private readonly elasticService: ElasticService,
  ) {}
  async process(document: string): Promise<BenefitsResponseDto> {
    const dataToken = await this.generateToken();
    if (!dataToken.success) {
      //adicionar exception aqui
    }

    const benefitExists = await this.redisService.readInformationFromCache(
      document,
    );

    if (!benefitExists) {
      const data: RequestBenefitsDto = {
        document: document,
        token: dataToken.access_token,
      };

      const benefits = await this.httpService.getBenefits(data);
      await this.redisService.addInformationToCache(
        benefits.data.document,
        benefits.data.benefits,
      );

      const createdAndIndexes = await this.elasticService.createIndex(benefits);
      if (!createdAndIndexes) {
        await this.elasticService.indexPost(benefits);
      }
      return benefits;
    }

    return benefitExists;
  }

  async generateToken(): Promise<AuthResponse> {
    const data = {
      username: process.env.EXTERNAL_API_USERNAME,
      password: process.env.EXTERNAL_API_PASSWORD,
    };
    const dataToken = await this.httpService.getToken(data);
    if (dataToken.sucess == false) {
      throw new HttpServerException();
    }
    return {
      access_token: dataToken.token,
      expiresIn: dataToken.expiresIn,
      success: dataToken.success,
    };
  }

  async getBenefits(document: string): Promise<BenefitsResponseDto> {
    try {
      const benefits = await this.redisService.readInformationFromCache(
        document,
      );

      if (benefits) {
        return benefits;
      }

      const benefitsByElastic = await this.elasticService.searchBenefits(
        document,
      );

      if (benefitsByElastic) {
        const dataBenefitsElastic: BenefitsResponseDto = {
          data: {
            benefits: benefitsByElastic[0].benefits,
            document: benefitsByElastic[0].document,
          },
          success: true,
        };
        await this.redisService.addInformationToCache(
          document,
          dataBenefitsElastic,
        );
        return dataBenefitsElastic;
      }

      return;
    } catch (error) {
      console.error('Erro ao obter benefícios:', error);
      throw new Error('Erro ao obter benefícios');
    }
  }
}
