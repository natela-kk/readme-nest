import { Injectable } from '@nestjs/common';
import dayjs = require('dayjs');
import { PostMemoryRepository } from '../post/post-memory.repository';
import { PostEntity } from '../post/post.entity';
import CreateCommentDto from './dto/create-comment.dto';
import * as crypto from 'crypto';

@Injectable()
export class CommentService {

  constructor(
    private readonly postRepository: PostMemoryRepository
  ) { }

  public async create(dto: CreateCommentDto) {
    const { postId, text, author } = dto;
    const post = await this.postRepository.findById(postId);

    const newComment = {
      _id: crypto.randomUUID(),
      text: text,
      postId: postId,
      author: author,
      date: dayjs().toDate(),
    }

    post.commentList.push(newComment);

    const postEntity = new PostEntity(post);
    return this.postRepository.update(postId, postEntity);
  }

  public async deleteById(postId: string, commentId: string) {
    const post = await this.postRepository.findById(postId);
    const commentList = post.commentList;
    const comment = commentList.find((item) => item._id === commentId);
    const commentIndex = commentList.indexOf(comment);
    commentList.splice(commentIndex, 1);

    const postEntity = new PostEntity(post);
    return this.postRepository.update(postId, postEntity);
  }
}
