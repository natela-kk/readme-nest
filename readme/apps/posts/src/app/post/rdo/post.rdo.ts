import { PostLink, PostPhoto, PostQuote, PostState, PostText, PostType, PostVideo, Comment } from '@readme/shared-types';
import { Expose } from 'class-transformer';

export class PostRdo {
  @Expose({ name: '_id' })
  public id: string;

  @Expose()
  public postType: PostType;

  @Expose()
  public state: PostState;

  @Expose()
  public author: string;

  @Expose()
  public  postCreationDate: Date;

  @Expose()
  public postDate: Date;

  @Expose()
  public reposted: boolean;

  @Expose()
  public likesCount: number;

  @Expose()
  public commentList: Comment[];

  @Expose()
  public tags?: string[];

  @Expose()
  public content: PostVideo | PostText | PostQuote | PostPhoto | PostLink;
}
