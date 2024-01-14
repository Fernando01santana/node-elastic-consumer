export class BenefitsResponseDto {
  success: boolean;
  data: BenefitsDataDto;
}

export class BenefitsDataDto {
  document: string;
  benefits: BeneficioDto[];
}

export class BeneficioDto {
  number_benefit: string;
  code_type_benefit: string;
}

export class RequestBenefitsDto {
  document: string;
  token: string;
}
