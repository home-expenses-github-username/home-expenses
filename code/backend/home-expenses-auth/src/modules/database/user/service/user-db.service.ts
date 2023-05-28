/*
 * Copyright (C) Vladimir Vysokomornyi
 * All Rights Reserved.
 */

import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../../database.constants';
import { User } from '../entity/user';
import { Repository } from 'typeorm';
import { Credentials } from '../../../auth/controllers/dto/credentials';
import * as argon from 'argon2';

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
    const newUser: Partial<User> = {
      email: credentials.email,
      passwordHash: await argon.hash(credentials.password),
      preview: true,
      verificationCodeHash: await argon.hash(credentials.verificationCode)
    };

    const user = this.userRepository.create(newUser);
    return this.userRepository.save(user);
  }

  async activate(user: User): Promise<User> {
    user.preview = false;
    user.verificationCodeHash = null;
    return this.userRepository.save(user);
  }

  async delete(email: string): Promise<any> {
    return this.userRepository.delete({ email });
  }

  async updateRefreshToken(user: User, refreshToken: string) {
    user.refreshTokenHash = await argon.hash(refreshToken);
    return this.userRepository.save(user);
  }
}
