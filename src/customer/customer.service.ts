import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { validate as isUUID } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { Customer } from './entities/customer.entity';

import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { LoginCustomerDto } from './dto/login.customer.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interface/jwt-payload.interface';

@Injectable()
export class CustomerService {
  private readonly logger = new Logger('CustomerService');

  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    try {
      const { password, ...customerDate } = createCustomerDto;

      const customer = this.customerRepository.create({
        ...customerDate,
        password: bcrypt.hashSync(password, 10),
      });

      await this.customerRepository.save(customer);

      return {
        ...customer,
        token: this.getJwtToken({ dni: customer.dni }),
      };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async login(loginCustomerDto: LoginCustomerDto) {
    const { password, dni } = loginCustomerDto;

    const customer = await this.customerRepository.findOne({
      where: { dni },
      select: { dni: true, password: true, id: true },
    });
    if (!customer)
      throw new UnauthorizedException('Credentials are not valid (dni)');

    if (!bcrypt.compareSync(password, customer.password))
      throw new UnauthorizedException('Credentials are not valid (password)');

    return {
      ...customer,
      token: this.getJwtToken({ dni: customer.dni }),
    };
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return await this.customerRepository.find({
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

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDBExceptions(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
