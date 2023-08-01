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
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('register')
  @ApiResponse({ status: 201, description: 'Customer was registered.', type: Customer})
  @ApiResponse({ status: 400, description: 'Bad request.'})
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.'})
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Post('login')
  @ApiResponse({ status: 200, description: 'Customer login.', type: Customer})
  @ApiResponse({ status: 400, description: 'Bad request.'})
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.'})
  login(@Body() loginCustomerDto: LoginCustomerDto) {
    return this.customerService.login(loginCustomerDto);
  }

  @Get('check-status')
  @Auth()
  @ApiResponse({ status: 200, description: 'Check-Status.'})
  @ApiResponse({ status: 400, description: 'Bad request.'})
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.'})
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
