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

  /*@Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })*/
  @ApiProperty({
    description: 'The password must have a Uppercase, lowercase letter and a number',
    example: '1234'
  })
  @IsString()
  @MinLength(4)
  @MaxLength(4)
  password: string;
}
