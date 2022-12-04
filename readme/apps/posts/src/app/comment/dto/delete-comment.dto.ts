import { ApiProperty } from '@nestjs/swagger';

export default class DeleteCommentDto {
  @ApiProperty({
    description: 'The uniq post ID',
    example: 'ue33882'
  })
  public postId: string;

  @ApiProperty({
    description: 'The uniq comment ID',
    example: 'dh33455'
  })
  public commentId: string;
}
