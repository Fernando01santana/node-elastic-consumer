// custom.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class ElasticInformationNotFound extends HttpException {
  constructor() {
    super(
      'Erro ao realizar operacao, verifique a integracao: Elastic',
      HttpStatus.NOT_FOUND,
    );
  }
}
