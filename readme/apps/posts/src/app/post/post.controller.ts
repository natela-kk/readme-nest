import { Body, Controller, Delete, Get, Param, Post, Patch } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
import { fillObject } from '@readme/core';
import { PostRdo } from './rdo/post.rdo';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService
  ) { }

  @Get(':id')
  async get(@Param('id') id) {
    const post = await this.postService.findById(id);

    return fillObject(PostRdo, post);
  }

  @Post()
  async create(@Body() dto: CreatePostDto) {
    console.log(dto);
    console.log("Controller 16");
    const newPost = await this.postService.create(dto);
    return fillObject(PostRdo, newPost);
  }

  @Patch(':id')
  async updateById(@Param('id') id, @Body() dto: CreatePostDto) {
    const updatedPost = await this.postService.updateById(id, dto);
    return fillObject(PostRdo, updatedPost);
  }

  @Delete(':id')
  async deleteById(@Param('id') id) {
    await this.postService.deleteById(id);
    return;
  }

}
