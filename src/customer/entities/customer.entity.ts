import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Operation } from '../../operations/entities/operation.entity';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  dni: string;

  @Column('text', {
    select: false,
  })
  password: string;

  @Column('text')
  fullName: string;

  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  @OneToOne(() => Operation, (op) => op.customer)
  operation?: Operation;
}
