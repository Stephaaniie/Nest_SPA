import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasi } from './entities/tasi.entity';
import { Transaction } from './entities/transaction.entity';
import { Account } from './entities/account.entity';
import { TasiService } from './tasi.service';
import { TasiController } from './tasi.controller';

@Module({
  controllers: [TasiController],
  providers: [TasiService],
  imports: [TypeOrmModule.forFeature([Tasi, Transaction, Account])],
  exports: [TasiService, TypeOrmModule],
})
export class TasiModule {}
