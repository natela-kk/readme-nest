import { PostVideo, PostText, PostQuote, PostPhoto, PostLink} from '@readme/shared-types';

export class CreatePostDto {
  public postType: string;
  public tags?: string;
  public content: PostVideo | PostText | PostQuote | PostPhoto | PostLink;
}
