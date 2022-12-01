import { Post, PostLink, PostPhoto, PostQuote, PostState, PostText, PostType, PostVideo, Comment } from '@readme/shared-types';

export class PostEntity implements Post {
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

  constructor(post: Post) {
    this.fillEntity(post);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(post: Post) {
    this._id = post._id;
    this.postType = post.postType;
    this.state = post.state;
    this.author = post.author;
    this.postCreationDate = post.postCreationDate;
    this.postDate = post.postDate;
    this.reposted = post.reposted;
    this.initialId = post.initialId;
    this.initialAuthor = post.initialAuthor;
    this.likesCount = post.likesCount;
    this.commentList = post.commentList;
    this.tags = post.tags;
    this.content = post.content;
  }
}
