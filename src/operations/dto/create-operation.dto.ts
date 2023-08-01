import { IsIn, IsNumber, IsPositive, IsString } from 'class-validator';
import { BeforeInsert } from 'typeorm';

export class CreateOperationDto {
  @IsIn(['Transferencia','Extraccion','Deposito'])
  tipoOperacion: string;

  @IsNumber()
  @IsPositive()
  importe: number;

  @IsString()
  detalle: string;

}