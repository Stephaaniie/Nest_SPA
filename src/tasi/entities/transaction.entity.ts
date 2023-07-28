import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from './account.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  cuentaId: string;

  @Column('date')
  fechaAlt: Date;

  @Column('int', {
    default: 0,
  })
  estadoID: number;

  @Column('float', {
    default: 0,
  })
  importe: number;

  @Column('text')
  tipoOperacion: string;

  @Column('text')
  detalle: string;

  @Column('text')
  deUsuarioId: string;

  @Column('text')
  aUsuarioId: string;

  @Column('text')
  deCuentaId: string;

  @Column('text')
  aCuentaId: string;

  @ManyToOne(() => Account, (account) => account.transaction)
  account: Account;
}
