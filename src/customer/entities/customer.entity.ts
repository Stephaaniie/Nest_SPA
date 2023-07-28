import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Tasi } from '../../tasi/entities/tasi.entity';

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

  @OneToMany(() => Tasi, (tasi) => tasi.customer)
  tasi?: Tasi;
}
