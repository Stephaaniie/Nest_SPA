import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { initialData } from './data/seed-data';
import { Customer } from 'src/customer/entities/customer.entity';
import { OperationsService } from 'src/operations/operations.service';


@Injectable()
export class SeedService {

  constructor(
    private readonly operationService: OperationsService,

    @InjectRepository( Customer )
    private readonly customerRepository: Repository<Customer>
  ) {}


  async runSeed() {
    await this.deleteTables();
    const adminUser = await this.insertUsers();    
    await this.insertNewAccount( adminUser );    
    return 'SEED EXECUTED';
  }

  private async deleteTables() {
    await this.operationService.deleteAllAccount();
    const queryBuilder = this.customerRepository.createQueryBuilder();
    await queryBuilder
      .delete()
      .where({})
      .execute()
  }

  private async insertUsers() {
    const seedUsers = initialData.customers;        
    const customer: Customer[] = [];
    seedUsers.forEach( user => {
      customer.push( this.customerRepository.create( user ) )
    });
    
    const dbUsers = await this.customerRepository.save( seedUsers )
    return dbUsers[0];
  }

  private async insertNewAccount( user: Customer ) {
    await this.operationService.deleteAllAccount();
    const account = initialData.operations;
    
    const insertPromises = [];
    account.forEach( x => {
      insertPromises.push( this.operationService.create( x, user ) );
    });
    console.log(insertPromises);
    
    await Promise.all( insertPromises );
    return true;
  }
}