/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CustomerService } from './customer.service';

import { LoginCustomerDto } from './dto/login.customer.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

import { RawHeaders } from './decoration/raw-headers.decorator';
import { GetCustomer } from './decoration/get-customer.decorator';
import { RoleProtected } from './decoration/role-protected.decorator';

import { ValidRoles } from './interface/valid-roles';
import { Customer } from './entities/customer.entity';
import { UserRoleGuard } from './guards/user-role/user-role.guard';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('register')
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Post('login')
  login(@Body() loginCustomerDto: LoginCustomerDto) {
    return this.customerService.login(loginCustomerDto);
  }

  @Get('private')
  @RoleProtected(ValidRoles.admin, ValidRoles.user, ValidRoles.superUser)
  @UseGuards( AuthGuard(), UserRoleGuard )
  testingPrivateRoute( 
    @Req() request: Express.Request,
    @GetCustomer() customer: Customer,
    @GetCustomer('dni') dniCustomer: string,
    @RawHeaders() rawheaders: string[],
  ) {
    return {
      customer,
      dniCustomer,
      rawheaders
    };
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.customerService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.customerService.findOne(term);
  }

  @Patch(':term')
  update(
    @Param('term') term: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(term, updateCustomerDto);
  }
}
