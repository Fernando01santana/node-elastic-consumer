import { Controller, Get, Query } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { BenefitsService } from '../services/benefits.service';

@Controller('benefits')
export class BenefitsController {
  constructor(private readonly benefitService: BenefitsService) {}

  @EventPattern('documents-benefits')
  async dataProcess(
    @Payload() data: string,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    try {
      const documentData = JSON.parse(data.toString());
      await this.benefitService.process(documentData);
      await channel.ack(message);
      return;
    } catch (error) {
      console.log(error);
    }
  }

  @Get('detail')
  async benefits(@Query('document') document: string): Promise<any> {
    return await this.benefitService.getBenefits(document);
  }
}
