import { Customer } from 'src/customer/entities/customer.entity';
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from './account.entity';

@Entity('tasi')
export class Tasi {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Customer, (customer) => customer.tasi, { eager: true })
  customer: Customer;

  @OneToMany(() => Account, (account) => account.tasi, { cascade: true })
  account: Account[];
}
