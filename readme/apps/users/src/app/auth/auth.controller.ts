import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRdo } from './rdo/user.rdo';
import { fillObject } from '@readme/core';
import { LoginUserDto } from './dto/login-user.dto';
import { LoggedUserRdo } from './rdo/logged-user.rdo';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('register')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been succesfull created'
  })
  async create(@Body() dto: CreateUserDto) {
    console.log(dto)
    const newUser = await this.authService.register(dto);
    console.log(newUser)
    return fillObject(UserRdo, newUser);
  }

  @Post('login')
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);
    return fillObject(LoggedUserRdo, verifiedUser);
  }

  @Get(':id')
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  async show(@Param('id') id: string) {
    const existUser = await this.authService.getUser(id);
    return fillObject(UserRdo, existUser);
  }

}
