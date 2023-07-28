/* eslint-disable prettier/prettier */
import { ExecutionContext, InternalServerErrorException, createParamDecorator } from '@nestjs/common';

export const GetCustomer = createParamDecorator(
  ( data: string, ctx: ExecutionContext ) => {
    const req = ctx.switchToHttp().getRequest();
    const customer = req.user;

    if(!customer)
      throw new InternalServerErrorException('Customer not found (request)');
    return (!data) ? customer : customer[data];
});
