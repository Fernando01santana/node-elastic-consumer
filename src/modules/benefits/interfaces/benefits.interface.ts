import { BenefitsResponseDto } from 'src/shared/common/axios/dto/benefits.dto';

export default interface BenefitsInterface {
  getBenefits(document: string, token: string): Promise<BenefitsResponseDto>;
}
