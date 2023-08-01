import { ApiProperty } from "@nestjs/swagger";
import { Customer } from "src/customer/entities/customer.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('operation')
export class Operation {
  @ApiProperty({
    example: '3ca0a694-a4fb-4163-9c80-18487d9d6a94',
    description: 'Operation Id',
    uniqueItems:true
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: '90000',
    description: 'Importe',
  })
  @Column('float', {
    default: 0,
  })
  importe: number;

  @ApiProperty({
    example: 'Deposito',
    description: 'Se realiza un deposito en cuenta',
  })
  @Column('text')
  tipoOperacion: string;

  @ApiProperty({
    example: 'Existe la necesidad de poder dar un detalle por el cual se realiza esta operacion',
    description: 'Operation description'
  })
  @Column('text')
  detalle: string;

  @ManyToOne(
    () => Customer,
    ( user ) => user.operation,
    { eager: true })
    customer: Customer
}
