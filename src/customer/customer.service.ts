import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { Customer } from './entities/customer.entity';

import { CreateCustomerDto } from './dto/create-customer.dto';
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
      select: { 
        dni: true, 
        password: true, 
        fullName: true,
        id: true,
        isActive: true,
        roles: true,
      },
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

  async checkAuthStatus(customer: Customer) {
    return {
      ...customer,
      token: this.getJwtToken({ dni: customer.id }),
    };
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
