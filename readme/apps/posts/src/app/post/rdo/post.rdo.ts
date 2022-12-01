import { ApiProperty } from '@nestjs/swagger';
import { PostLink, PostPhoto, PostQuote, PostState, PostText, PostType, PostVideo, Comment } from '@readme/shared-types';
import { Expose } from 'class-transformer';

export class PostRdo {
  @ApiProperty({
    description: 'The uniq post ID',
    example: '13'
  })
  @Expose({ name: '_id' })
  public id: string;

  @ApiProperty({
    description: 'Type of post',
    example: 'Quote'
  })
  @Expose()
  public postType: PostType;

  @ApiProperty({
    description: 'Post state',
    example: 'published'
  })
  @Expose()
  public state: PostState;

  @ApiProperty({
    description: 'The uniq user ID',
    example: '2u87'
  })
  @Expose()
  public author: string;

  @ApiProperty({
    description: 'Date of the post creation',
    example: '02-01-2022'
  })
  @Expose()
  public postCreationDate: Date;

  @ApiProperty({
    description: 'date of post publication',
    example: '03-01-2022'
  })
  @Expose()
  public postDate: Date;

  @ApiProperty({
    description: 'The repost status',
    example: 'false'
  })
  @Expose()
  public reposted: boolean;

  @ApiProperty({
    description: 'The initial uniq post ID',
    example: '13'
  })
  @Expose()
  public initialId: string;

  @ApiProperty({
    description: 'The initial uniq user ID',
    example: '2u87'
  })
  @Expose()
  public initialAuthor: string;

  @ApiProperty({
    description: `Likes list with users' ID`,
    example: 'user1, user3'
  })
  @Expose()
  public likesCount: number;

  @ApiProperty({
    description: 'The comment list',
    example: {
      _id: 'qu4ur',
      text: 'wow',
      postId: '13',
      author: 'user1',
      date: '12-12-2022',
    }
  })
  @Expose()
  public commentList: Comment[];

  @ApiProperty({
    description: 'Tags list',
    example: 'cat, home'
  })
  @Expose()
  public tags?: string[];

  @ApiProperty({
    description: 'Main content',
    example: '“How we behave toward cats here below determines our status in heaven.” – Robert A. Heinlein'
  })
  @Expose()
  public content: PostVideo | PostText | PostQuote | PostPhoto | PostLink;
}
