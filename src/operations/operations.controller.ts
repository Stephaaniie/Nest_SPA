import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { OperationsService } from './operations.service';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { Auth, GetCustomer } from 'src/customer/decorators';
import { ValidRoles } from 'src/customer/interface';
import { Customer } from 'src/customer/entities/customer.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('operations')
export class OperationsController {
  constructor(private readonly operationsService: OperationsService) {}

  @Post()
  //@Auth()
  create(@Body() createOperationDto: CreateOperationDto,
  @GetCustomer() customer: Customer,
  ) {
    return this.operationsService.create(createOperationDto, customer);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.operationsService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.operationsService.findOne(term);
  }

  @Patch(':id')
  //@Auth( ValidRoles.admin)
  update(@Param('id', ParseUUIDPipe) id: string, 
  @Body() updateOperationDto: UpdateOperationDto,
  @GetCustomer() customer: Customer
  ) {
    return this.operationsService.update(id, updateOperationDto, customer);
  }

  @Delete(':id')
  //@Auth( ValidRoles.admin)
  remove(@Param('id', ParseUUIDPipe ) id: string) {
    return this.operationsService.remove(id);
  }
}
