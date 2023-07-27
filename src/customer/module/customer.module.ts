import { Module } from '@nestjs/common';
import { CustomerService } from '../service/customer.service';
import { CustomerController } from '../controller/customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../entities/customer.entity';
import { Transaction } from '../entities/transaction.entity';
import { Tasi } from '../entities/tasi.entity';
import { Account } from '../entities/account.entity';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService],
  imports: [TypeOrmModule.forFeature([Customer, Transaction, Tasi, Account])],
})
export class CustomerModule {}
