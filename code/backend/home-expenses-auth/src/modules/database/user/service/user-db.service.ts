/*
 * Author: Vladimir Vysokomornyi
 */

import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../../database.constants';
import { User } from '../entity/user';
import { Repository } from 'typeorm';
import { CredentialsDto } from '../../../auth/controllers/dto/credentials';
import * as argon from 'argon2';
import { CreateUserDto } from '../../../../controllers/user/dto/create.user.dto';

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

  async create(dto: CreateUserDto): Promise<User> {
    const user = new User();
    user.email = dto.email;
    user.preview = dto.preview;
    user.passwordHash = dto.passwordHash;

    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async delete(email: string): Promise<any> {
    return this.userRepository.delete({ email });
  }

  async createPreview(credentials: CredentialsDto): Promise<User> {
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

  async updateRefreshToken(user: User, refreshToken: string) {
    if (refreshToken) {
      user.refreshTokenHash = await argon.hash(refreshToken);
    } else {
      user.refreshTokenHash = null;
    }

    return this.userRepository.save(user);
  }

  async updatePassword(user: User, newPassword: string, refreshToken: string) {
    user.refreshTokenHash = await argon.hash(refreshToken);
    user.passwordHash = await argon.hash(newPassword);
    return this.userRepository.save(user);
  }

  async pendingRecover(user: User, verificationCode: string): Promise<User> {
    user.pendingRecover = true;
    user.verificationCodeHash = await argon.hash(verificationCode);
    return this.userRepository.save(user);
  }

  async finishRecover(user: User, newPassword: string): Promise<User> {
    user.passwordHash = await argon.hash(newPassword);
    user.pendingRecover = false;
    user.verificationCodeHash = null;
    return this.userRepository.save(user);
  }
}
