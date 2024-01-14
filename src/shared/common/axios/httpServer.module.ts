// http.module.ts
import { Module } from '@nestjs/common';
import { HttpService } from './services/httpServer';

@Module({
  providers: [HttpService],
  exports: [HttpService],
})
export class HttpModule {}
