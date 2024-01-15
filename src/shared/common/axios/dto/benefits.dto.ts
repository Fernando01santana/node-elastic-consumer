import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class BeneficioDto {
  @ApiProperty({
    description: 'Número do benefício',
    example: '7846708245',
  })
  @IsString()
  @IsNotEmpty()
  number_benefit: string;

  @ApiProperty({
    description: 'Código do tipo de benefício',
    example: '33',
  })
  @IsString()
  @IsNotEmpty()
  code_type_benefit: string;
}

export class BenefitsDataDto {
  @ApiProperty({
    description: 'Dados da resposta',
    type: BeneficioDto,
  })
  benefits: BeneficioDto[];

  @ApiProperty({
    description: 'Número do documento',
    example: '86923000041',
  })
  @IsString()
  @IsNotEmpty()
  document: string;
}

export class BenefitsResponseDto {
  @ApiProperty({
    description: 'Indica se a operação foi bem-sucedida',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  success: boolean;

  @ApiProperty({
    description: 'Dados da resposta',
    type: BenefitsDataDto,
  })
  data: BenefitsDataDto;
}

export class RequestBenefitsDto {
  @ApiProperty({
    description: 'Número do documento',
    example: '86923000041',
  })
  @IsString()
  @IsNotEmpty()
  document: string;

  @ApiProperty({
    description: 'Token de autenticação',
    example: 'your_auth_token',
  })
  @IsString()
  @IsNotEmpty()
  token: string;
}
