import { Comment } from './comment.interface';
import { PostState } from './post-state.enum';
import { PostType } from './post-type.enum';
import { PostLink, PostPhoto, PostQuote, PostText, PostVideo } from './post-types.interface';

export interface Post {
  _id: string;
  postType: PostType;
  state: PostState;
  author: string;
  postCreationDate: Date;
  postDate: Date;
  reposted: boolean;
  initialId?: string;
  initialAuthor?: string;
  likesCount: string[];
  commentList: Comment[];
  tags?: string[];
  content: PostVideo | PostText | PostQuote | PostPhoto | PostLink;
}
