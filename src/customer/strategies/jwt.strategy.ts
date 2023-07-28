/* eslint-disable prettier/prettier */
import { PassportStrategy } from '@nestjs/passport';
import { Customer } from '../entities/customer.entity';
import { JwtPayload } from '../interface/jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException, Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<Customer> {
    const { dni } = payload;
    const customer = await this.customerRepository.findOneBy({ dni });

    if (!customer) throw new UnauthorizedException('Token not valid');

    if (!customer.isActive)
      throw new UnauthorizedException(
        'Customer is inactive, talk with an admin',
      );
    return customer;
  }
}
