import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthResponse {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  access_token: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  expiresIn: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  success: boolean;
}
