import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { CustomerModule } from 'src/customer/customer.module';
import { SeedService } from './seed.service';
import { OperationsModule } from '../operations/operations.module';


@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    CustomerModule,
    OperationsModule
  ]
})
export class SeedModule {}