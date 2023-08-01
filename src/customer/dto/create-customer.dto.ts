import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MaxLength,
  MinLength,
  Matches,
  IsOptional,
} from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({
    description: 'Insert DNI',
    example: '48414099',
    uniqueItems:true
  })
  @IsString()
  @MaxLength(8)
  dni: string;

  @ApiProperty({
    description: 'The password must have a Uppercase, lowercase letter and a number',
    example: 'Abc123@'
  })
  @IsString()
  @MinLength(6)
  @MaxLength(8)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @ApiProperty({
    description: 'Insert name',
    example: 'Stephanie Castillo'
  })
  @IsString()
  @IsOptional()
  @MinLength(1)
  fullName?: string;
}
