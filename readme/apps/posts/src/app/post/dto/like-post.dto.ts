import { ApiProperty } from '@nestjs/swagger';

export default class LikePostDto {
  @ApiProperty({
    description: 'The uniq user ID',
    example: 'sfjihf889'
  })
  public userId: string;
}
