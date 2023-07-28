import { IsString, MinLength } from 'class-validator';
export class CreateAccountDto {
  @IsString()
  @MinLength(8)
  readonly customer: string;
}
