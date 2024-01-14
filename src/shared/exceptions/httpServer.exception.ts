// custom.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class HttpServerException extends HttpException {
  constructor() {
    super('Erro ao realizar operacao', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
