import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { CreateCustomerDto } from './dto/create-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { PaginationDto } from '../common/dtos/pagination.dto';

import { validate as isUUID } from 'uuid';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  private readonly logger = new Logger('CustomerService');
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    try {
      const customer = this.customerRepository.create(createCustomerDto);
      await this.customerRepository.save(customer);
      return customer;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.customerRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(term: string) {
    let customer: Customer;
    if (isUUID(term)) {
      customer = await this.customerRepository.findOneBy({ id: term });
    } else {
      const queryBuilder = this.customerRepository.createQueryBuilder();

      customer = await queryBuilder
        .where('dni=:dni or password=:password', {
          dni: term,
          password: term,
        })
        .getOne();
    }
    if (!customer)
      throw new NotFoundException(`Customer with id ${term} not found`);
    return customer;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.customerRepository.preload({
      id: id,
      ...updateCustomerDto,
    });
    if (!customer)
      throw new NotFoundException(`Customer with id: ${id} not found`);

    try {
      await this.customerRepository.save(customer);
      return customer;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
