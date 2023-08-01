import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { OperationsService } from './operations.service';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { Auth, GetCustomer } from 'src/customer/decorators';
import { ValidRoles } from 'src/customer/interface';
import { Customer } from 'src/customer/entities/customer.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Operation } from './entities/operation.entity';

@ApiTags('Operaciones')
@Controller('operations')
export class OperationsController {
  constructor(private readonly operationsService: OperationsService) {}

  @Post()
  //@Auth()
  @ApiResponse({ status: 201, description: 'Operation was created.', type: Operation})
  @ApiResponse({ status: 400, description: 'Bad request.'})
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.'})
  create(@Body() createOperationDto: CreateOperationDto,
  @GetCustomer() customer: Customer,
  ) {
    return this.operationsService.create(createOperationDto, customer);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'All Operations.'})
  @ApiResponse({ status: 400, description: 'Bad request.'})
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.'})
  findAll(@Query() paginationDto: PaginationDto) {
    return this.operationsService.findAll(paginationDto);
  }

  @Get(':term')
  @ApiResponse({ status: 200, description: 'Operation was serch by term.', type: Operation})
  @ApiResponse({ status: 400, description: 'Bad request.'})
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.'})
  findOne(@Param('term') term: string) {
    return this.operationsService.findOne(term);
  }

  @Patch(':id')
  @ApiResponse({ status: 201, description: 'Operation was updated.', type: Operation})
  @ApiResponse({ status: 400, description: 'Bad request.'})
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.'})
  @Auth( ValidRoles.admin)
  update(@Param('id', ParseUUIDPipe) id: string, 
  @Body() updateOperationDto: UpdateOperationDto,
  @GetCustomer() customer: Customer
  ) {
    return this.operationsService.update(id, updateOperationDto, customer);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Operation was deleted.'})
  @ApiResponse({ status: 400, description: 'Bad request.'})
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.'})
  @Auth( ValidRoles.admin)
  remove(@Param('id', ParseUUIDPipe ) id: string) {
    return this.operationsService.remove(id);
  }
}
