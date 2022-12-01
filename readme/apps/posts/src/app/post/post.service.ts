import { Injectable } from '@nestjs/common';
import { Post, PostState, PostType } from '@readme/shared-types';
import dayjs = require('dayjs');
import { CreatePostDto } from './dto/create-post.dto';
import { PostMemoryRepository } from './post-memory.repository';
import { PostEntity } from './post.entity';

@Injectable()
export class PostService {

  constructor(
    private readonly postRepository: PostMemoryRepository
  ) { }

  async findById(id: string) {
    return this.postRepository
      .findById(id);
  }

  async create(dto: CreatePostDto) {
    const { postType, tags, content } = dto;

    const post: Post = {
      _id: '',
      postType: PostType[postType],
      state: PostState.Published,
      author: '',
      postCreationDate: dayjs().toDate(),
      postDate: dayjs().toDate(),
      reposted: false,
      likesCount: [],
      commentList: [],
      tags: [tags],
      content
    }

    const postEntity = new PostEntity(post);

    return this.postRepository.create(postEntity);
  }

  async updateById(id: string, dto: CreatePostDto) {
    const post = await this.postRepository.findById(id);
    const { postType, tags, content } = dto;

    if (post) {

      const updatedPost: Post = {
        _id: id,
        postType: PostType[postType],
        state: PostState.Published,
        author: '',
        postCreationDate: dayjs().toDate(),
        postDate: dayjs().toDate(),
        reposted: false,
        likesCount: [],
        commentList: [],
        tags: [tags],
        content
      }

      const postEntity = new PostEntity(updatedPost);
      return this.postRepository.update(id, postEntity);
    }
  }

  async repost(id) {
    const post = await this.postRepository.findById(id);
    post.reposted = true;
    post.initialId = post._id;
    post.initialAuthor = post.author;
    post.author = 'new author';
    post.postDate = dayjs().toDate();
    const postEntity = new PostEntity(post);
    return this.postRepository.create(postEntity);
  }

  async like(postId, userId) {
    const post = await this.postRepository.findById(postId);
    const userInd = post.likesCount.indexOf(userId);

    if (userInd >= 0) {
      post.likesCount.splice(userInd, 1);
    } else {
      post.likesCount.push(userId);
    }

    const postEntity = new PostEntity(post);
    return this.postRepository.update(postId, postEntity);
  }

  async deleteById(id: string) {
    this.postRepository.destroy(id);
  }


}
