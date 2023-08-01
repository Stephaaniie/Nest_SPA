import { Module } from '@nestjs/common';
import { OperationsService } from './operations.service';
import { OperationsController } from './operations.controller';
import { Operation } from './entities/operation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
  controllers: [OperationsController],
  providers: [OperationsService],
  imports: [
    TypeOrmModule.forFeature([ Operation ]),
    CustomerModule,
  ],
  exports: [
    OperationsService,
    TypeOrmModule,
  ]
})
export class OperationsModule {}
