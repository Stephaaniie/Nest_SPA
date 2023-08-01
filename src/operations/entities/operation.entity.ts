import { Customer } from "src/customer/entities/customer.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('operation')
export class Operation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float', {
    default: 0,
  })
  importe: number;

  @Column('text')
  tipoOperacion: string;

  @Column('text')
  detalle: string;

  @ManyToOne(
    () => Customer,
    ( user ) => user.operation,
    { eager: true })
    customer: Customer
}
