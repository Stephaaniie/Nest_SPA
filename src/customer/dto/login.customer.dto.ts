/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class LoginCustomerDto {
  @ApiProperty({
    description: 'Insert DNI',
    example: '48414099'
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
}
