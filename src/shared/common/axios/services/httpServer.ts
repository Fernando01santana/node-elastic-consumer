import { Injectable } from '@nestjs/common';
import axios, { AxiosError, AxiosResponse, HttpStatusCode } from 'axios';
import { BenefitsResponseDto, RequestBenefitsDto } from '../dto/benefits.dto';
import { RequestTokenDto } from '../interfaces/benefits.interface';

@Injectable()
export class HttpService {
  private readonly authenticationHost: string = process.env.AUTHENTICATION_HOST;

  async getBenefits(data: RequestBenefitsDto): Promise<BenefitsResponseDto> {
    const url = '/api/v1/inss/consulta-beneficios?cpf=';
    const headers = {
      Authorization: 'Bearer ' + data.token,
    };
    const endpoint = `${this.authenticationHost}${url}${data.document}`;
    const response: AxiosResponse = await axios.get(endpoint, {
      headers: headers,
    });

    let benefitData: BenefitsResponseDto;
    if (response.status === HttpStatusCode.Ok) {
      benefitData.data.benefits = response.data.data.benefits;
      benefitData.data.document = response.data.data.cpf;
      benefitData.success = response.data.sucess;

      return benefitData;
    }

    if (response && response.status >= HttpStatusCode.BadGateway) {
      throw new Error(response.statusText);
    }

    return benefitData;
  }
  async getToken(data: any): Promise<any> {
    try {
      const url = 'api/v1/token';
      const endpoint = `${this.authenticationHost}/${url}`;
      const response: AxiosResponse = await axios.post(endpoint, data);

      const tokenDto: RequestTokenDto = {
        token: response.data.data.token,
        expiresIn: response.data.data.expiresIn,
        success: response.data.success,
      };

      return tokenDto;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  private handleError(error: AxiosError) {
    console.error('HTTP Request Error:', error.message);
    throw new Error('Failed to make HTTP request');
  }
}
