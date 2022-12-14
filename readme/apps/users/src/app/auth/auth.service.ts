import { Inject, Injectable } from '@nestjs/common';
import { User } from '@readme/shared-types';
import { CreateUserDto } from './dto/create-user.dto';
import * as dayjs from 'dayjs';
import { UserEntity } from '../user/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './auth.constant';
import { ConfigType } from '@nestjs/config';
import databaseConfig from '../../config/database.config';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,

    @Inject(databaseConfig.KEY)
    private readonly mongoConfig: ConfigType<typeof databaseConfig>,
  ) {
  }

  async register(dto: CreateUserDto) {
    const { email, name, password, avatar } = dto;

    const user: User = {
      email, name, passwordHash: '', avatar, regDate: dayjs().toDate()
    }

    const existUser = await this.userRepository.findByEmail(email);

    if (existUser) {
      throw new Error('User already exists');
    }

    const userEntity = new UserEntity(user);
    await userEntity.setPassword(password);

    return this.userRepository.create(userEntity);
  }

  async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new Error(AUTH_USER_NOT_FOUND);
    }

    const userEntity = new UserEntity(existUser);
    if (! await userEntity.comparePassword(password)) {
      throw new Error(AUTH_USER_PASSWORD_WRONG);
    }

    return userEntity.toObject();
  }

  async getUser(id: string) {
    return this.userRepository.findById(id);
  }

}
