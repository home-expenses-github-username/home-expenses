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
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { UserDbService } from '../../modules/database/user/service/user-db.service';
import { User } from '../../modules/database/user/entity/user';
import { ALREADY_REGISTERED_ERROR, USER_NOT_FOUND_ERROR } from '../../modules/database/user/user.constants';
import { AccessTokenGuard } from '../../modules/auth/guards/access-token.guard';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserDbService) {}

  @UseGuards(AccessTokenGuard)
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
