/*
 * Copyright (C) Vladimir Vysokomornyi
 * All Rights Reserved.
 */

import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../../database.constants';
import { User } from '../entity/user';
import { Repository } from 'typeorm';
import { Credentials } from '../../../controllers/auth/dto/credentials';
import { genSalt, hash } from 'bcryptjs';

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

  async createPreview(credentials: Credentials): Promise<User> {
    const salt = await genSalt(10);

    const newUser: Partial<User> = {
      email: credentials.email,
      passwordHash: await hash(credentials.password, salt),
      preview: true,
      verificationCode: credentials.verificationCode
    };

    const user = this.userRepository.create(newUser);
    return this.userRepository.save(user);
  }

  async activate(user: User): Promise<User> {
    user.preview = false;
    return this.userRepository.save(user);
  }

  async delete(email: string): Promise<any> {
    return this.userRepository.delete({ email });
  }
}
