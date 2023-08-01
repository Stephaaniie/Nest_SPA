/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; 
import { CustomerService } from './customer.service';
import { LoginCustomerDto, CreateCustomerDto } from './dto';
import { RawHeaders, GetCustomer, RoleProtected, Auth } from './decorators';
import { ValidRoles } from './interface/valid-roles';
import { Customer } from './entities/customer.entity';
import { UserRoleGuard } from './guards/user-role.guard';

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

  @Get('check-status')
  @Auth()
  checkAuthStatus(
    @GetCustomer() customer: Customer
  ) {
    return this.customerService.checkAuthStatus( customer );
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
}
