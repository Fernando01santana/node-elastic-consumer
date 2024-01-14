// custom.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class ElasticGenericError extends HttpException {
  constructor() {
    super(
      'Erro ao realizar operacao, verifique a integracao: Elastics',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

export class ElasticInformationNotFound extends HttpException {
  constructor() {
    super(
      'Erro ao realizar operacao, verifique a integracao: Elastic',
      HttpStatus.NOT_FOUND,
    );
  }
}
