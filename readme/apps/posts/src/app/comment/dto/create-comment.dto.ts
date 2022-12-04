import { ApiProperty } from '@nestjs/swagger';

export default class CreateCommentDto {
  @ApiProperty({
    description: 'Comment text',
    example: 'wow'
  })
  public text: string;

  @ApiProperty({
    description: 'The uniq post ID',
    example: 'ue33882'
  })
  public postId: string;

  @ApiProperty({
    description: 'The uniq user ID',
    example: 'sfjihf889'
  })
  public author: string;
}
