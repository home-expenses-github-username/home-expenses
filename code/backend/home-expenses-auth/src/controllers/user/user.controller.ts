/*
 * Copyright (C) Vladimir Vysokomornyi
 * All Rights Reserved.
 */

import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { UserDbService } from '../../database/user/service/user-db.service';
import { User } from '../../database/user/entity/user';
import { ALREADY_REGISTERED_ERROR, USER_NOT_FOUND_ERROR } from '../../database/user/user.constants';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserDbService) {}

  @Get('findAll')
  async findAll(): Promise<User[]> {
    return this.service.findAll();
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: User): Promise<User> {
    const isExisted = await this.service.findUser(dto.email);
    if (isExisted) {
      throw new BadRequestException(ALREADY_REGISTERED_ERROR);
    }

    return this.service.create(dto);
  }

  @Delete('delete/:email')
  async deleteByEmail(@Param('email') email: string): Promise<any> {
    const isExisted = await this.service.findUser(email);
    if (!isExisted) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR);
    }
    return this.service.delete(email);
  }
}
