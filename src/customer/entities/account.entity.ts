import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tasi } from './tasi.entity';
import { Transaction } from './transaction.entity';

@Entity('account')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float', {
    default: 0,
  })
  saldo: number;

  @ManyToOne(() => Tasi, (tasi) => tasi.account)
  tasi: Tasi;

  @OneToMany(() => Transaction, (transaction) => transaction.account, {
    cascade: true,
  })
  transaction: Transaction[];
}
