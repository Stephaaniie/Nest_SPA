import { Customer } from 'src/customer/entities/customer.entity';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { Operation } from './entities/operation.entity';

import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class OperationsService {

  private readonly logger = new Logger('OperationsService');

  constructor(

    @InjectRepository(Operation)
    private readonly operationRepository: Repository<Operation>,

    private readonly dataSource: DataSource,

  ) {}

  async create(createOperationDto: CreateOperationDto, customer: Customer) {
    try {
      const { ...operationNew } = createOperationDto;
      const operation = this.operationRepository.create({
        ...operationNew,
        customer,
      });
      
      await this.operationRepository.save( operation );
      return { ...operation };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const products = await this.operationRepository.find({
      take: limit,
      skip: offset,
    })

    return products.map( ( product ) => ({
      ...product,
    }))
  }

  async findOne(id: string) {
    let operation: Operation;

    if ( isUUID(id) ) {
      operation = await this.operationRepository.findOneBy({ id: id });
      console.log(operation);
      
    } else {
      const queryBuilder = this.operationRepository.createQueryBuilder('operation'); 
      operation = await queryBuilder
        .where('UPPER(tipoOperacion) =:tipoOperacion', {
          tipoOperacion: id.toUpperCase(),
        })
        .getOne();
    }

    if ( !operation ) 
      throw new NotFoundException(`Product with ${ id } not found`);

    return operation;
  }

  async update(id: string, updateOperationDto: UpdateOperationDto, customer: Customer) {
    const { ...toUpdate } = updateOperationDto;
    const operation = await this.operationRepository.preload({ id, ...toUpdate });

    if ( !operation ) throw new NotFoundException(`Operation with id: ${ id } not found`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      operation.customer = customer;
      await queryRunner.manager.save( operation );
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return this.findOne(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const operation = await this.findOne(id);
    await this.operationRepository.remove(operation);
  }

  private handleDBExceptions( error: any ) {
    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }
  async deleteAllAccount() {
    const query = this.operationRepository.createQueryBuilder('operation');
    try {
      return await query
        .delete()
        .where({})
        .execute();
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }
}
