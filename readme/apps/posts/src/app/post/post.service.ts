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
    console.log(postType, tags, content);
    console.log('service 19')

    const post: Post = {
      _id: '',
      postType: PostType[postType],
      state: PostState.Published,
      author: '',
      postCreationDate: dayjs().toDate(),
      postDate: dayjs().toDate(),
      reposted: false,
      likesCount: 0,
      commentList: [],
      tags: [tags],
      content
    }

    console.log(post)
    console.log('service 35')

    const postEntity = new PostEntity(post);

    return this.postRepository.create(postEntity);
  }

  async updateById(id: string, dto: CreatePostDto) {
    const post = await this.postRepository.findById(id);
    const {postType, tags, content} = dto;

    if (post) {

    const updatedPost: Post = {
      _id: id,
      postType: PostType[postType],
      state: PostState.Published,
      author: '',
      postCreationDate: dayjs().toDate(),
      postDate: dayjs().toDate(),
      reposted: false,
      likesCount: 0,
      commentList: [],
      tags: [tags],
      content
    }

    const postEntity = new PostEntity(updatedPost);
    return this.postRepository.update(id, postEntity);
  }
  }

  async deleteById(id: string) {
    this.postRepository.destroy(id);
  }


}
