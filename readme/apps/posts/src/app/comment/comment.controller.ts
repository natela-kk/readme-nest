import { Body, Controller, Delete, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@readme/core';
import { PostService } from '../post/post.service';
import { PostRdo } from '../post/rdo/post.rdo';
import { CommentService } from './comment.service';
import CreateCommentDto from './dto/create-comment.dto';
import DeleteCommentDto from './dto/delete-comment.dto';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(
    private readonly postService: PostService,
    private readonly commentService: CommentService
  ) { }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The comment has been succesfully created'
  })
  public async create(@Body() dto: CreateCommentDto) {
    const updatedPost = await this.commentService.create(dto);
    return fillObject(PostRdo, updatedPost);
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The comment list has been succesfully received'
  })
  public async getComments(@Param('id') id: string) {
    const post = await this.postService.findById(id);
    return post.commentList;
  }

  @Delete()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The comment has been succesfully deleted'
  })
  public async delete(@Body() dto: DeleteCommentDto) {
    const { postId, commentId } = dto;
    const updatedPost = await this.commentService.deleteById(postId, commentId);
    return fillObject(PostRdo, updatedPost);
  }
}
