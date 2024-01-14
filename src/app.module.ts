import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BenefitsModule } from './modules/benefits/benefits.module';

@Module({
  imports: [
    BenefitsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
