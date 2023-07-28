import {
  IsString,
  MaxLength,
  MinLength,
  Matches,
  IsOptional,
} from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @MaxLength(8)
  dni: string;

  @IsString()
  @MinLength(6)
  @MaxLength(8)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  fullName?: string;
}
