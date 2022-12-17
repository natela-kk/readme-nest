import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The uniq email address',
    example: 'keks@mail.ru'
  })
  public email: string;

  @ApiProperty({
    description: 'User name',
    example: 'Keks',
  })
  public name: string;

  @ApiProperty({
    description: 'User password',
    example: 'test'
  })
  public password: string;

  @ApiProperty()
  public avatar?: string;
}
