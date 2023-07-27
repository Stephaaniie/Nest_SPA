import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Tasi } from './tasi.entity';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  dni: string;

  @Column('text')
  password: string;

  @Column('text')
  fullName: string;

  @Column('bool')
  isActive: boolean;

  @Column('text')
  roles: string[];

  @OneToOne(() => Tasi, (tasi) => tasi.customer, { cascade: true })
  tasi?: Tasi;
}
