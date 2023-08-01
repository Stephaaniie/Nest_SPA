import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Operation } from '../../operations/entities/operation.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('customers')
export class Customer {
  @ApiProperty({
    example: '3ca0a694-a4fb-4163-9c80-18487d9d6a94',
    description: 'Operation Id',
    uniqueItems:true
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Insert DNI',
    example: '48414099',
    uniqueItems:true
  })
  @Column('text', {
    unique: true,
  })
  dni: string;

  @ApiProperty({
    description: 'The password must have a Uppercase, lowercase letter and a number',
    example: 'Abc123@'
  })
  @Column('text', {
    select: false,
  })
  password: string;

  @ApiProperty({
    description: 'Insert name',
    example: 'Stephanie Castillo'
  })
  @Column('text')
  fullName: string;

  @ApiProperty({
    description: 'Customer is active',
    example: 'true'
  })
  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Rol customer',
    example: ['user','admin'],
  })
  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  @OneToOne(() => Operation, (op) => op.customer)
  operation?: Operation;
}
