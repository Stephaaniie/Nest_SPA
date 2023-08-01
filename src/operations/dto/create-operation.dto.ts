import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsPositive, IsString } from 'class-validator';
import { BeforeInsert } from 'typeorm';

export class CreateOperationDto {
  @ApiProperty({
    description: 'Tipo de operacion que estan permitidas realizar',
    nullable: false
  })
  @IsIn(['Transferencia','Extraccion','Deposito'])
  tipoOperacion: string;

  @ApiProperty({
    example: 'Deposito',
    description: 'Se realiza un deposito en cuenta',
  })
  @IsNumber()
  @IsPositive()
  importe: number;

  @ApiProperty({
    example: 'Existe la necesidad de poder dar un detalle por el cual se realiza esta operacion',
    description: 'Operation description'
  })
  @IsString()
  detalle: string;

}