/*
 * Copyright (C) Vladimir Vysokomornyi
 * All Rights Reserved.
 */

import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../../database.constants';
import { User } from '../entity/user';
import { Repository } from 'typeorm';

@Injectable()
export class UserDbService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findUser(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  async create(user: User): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async delete(email: string): Promise<any> {
    return this.userRepository.delete({ email });
  }
}
