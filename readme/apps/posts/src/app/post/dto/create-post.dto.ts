import { ApiProperty } from '@nestjs/swagger';
import { PostVideo, PostText, PostQuote, PostPhoto, PostLink} from '@readme/shared-types';

export class CreatePostDto {
  @ApiProperty({
    description: 'Type of post',
    example: 'Quote'
  })
  public postType: string;

  @ApiProperty({
    description: 'Tags list',
    example: 'cat, home'
  })
  public tags?: string;

  @ApiProperty({
    description: 'Main content',
    example: '“How we behave toward cats here below determines our status in heaven.” – Robert A. Heinlein'
  })
  public content: PostVideo | PostText | PostQuote | PostPhoto | PostLink;
}
