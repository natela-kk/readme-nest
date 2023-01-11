import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'The uniq email address',
    example: 'keks@mail.ru'
  })
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: 'test'
  })
  public password: string;
}
