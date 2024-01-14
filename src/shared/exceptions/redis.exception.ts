// custom.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class RedisGenericError extends HttpException {
  constructor() {
    super(
      'Erro ao realizar operacao, verifique a integracao.',
      HttpStatus.NOT_FOUND,
    );
  }
}
