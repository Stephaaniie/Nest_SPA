import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from './customer.entity';
import { Account } from './account.entity';

@Entity('tasi')
export class Tasi {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Customer, (customer) => customer.tasi)
  customer: Customer;

  @OneToMany(() => Account, (account) => account.tasi, { cascade: true })
  account: Account[];
}
