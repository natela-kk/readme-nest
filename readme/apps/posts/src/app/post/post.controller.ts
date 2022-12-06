import { Body, Controller, Delete, Get, Param, Post, Patch, HttpStatus } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
import { fillObject } from '@readme/core';
import { PostRdo } from './rdo/post.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import LikePostDto from './dto/like-post.dto';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService
  ) { }

  @Get(':id')
  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'The post has been succesfully found'
  })
  async get(@Param('id') id: string) {
    const post = await this.postService.findById(id);

    return fillObject(PostRdo, post);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The post has been succesfully created'
  })
  async create(@Body() dto: CreatePostDto) {
    const newPost = await this.postService.create(dto);
    return fillObject(PostRdo, newPost);
  }

  @Post(':id')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The post has been succesfully reposted'
  })
  async repost(@Param('id') id: string) {
    const repostedPost = await this.postService.repost(id);
    return fillObject(PostRdo, repostedPost);
  }

  @Post(':id/like')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The like has been successfully processed'
  })
  async like(@Body() dto: LikePostDto, @Param('id') id: string) {
    const { userId } = dto;
    const likedPost = await this.postService.like(id, userId);
    console.log(userId);
    return fillObject(PostRdo, likedPost);
  }

  @Patch(':id')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The post has been succesfully updated'
  })
  async updateById(@Body() dto: CreatePostDto, @Param('id') id: string) {
    const updatedPost = await this.postService.updateById(id, dto);
    return fillObject(PostRdo, updatedPost);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The post has been succesfully deleted'
  })
  async deleteById(@Param('id') id: string) {
    await this.postService.deleteById(id);
    return;
  }

}
