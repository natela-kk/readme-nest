import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@readme/core';
import { Post } from '@readme/shared-types';
import { PostEntity } from './post.entity';
import * as crypto from 'crypto';

@Injectable()
export class PostMemoryRepository implements CRUDRepository<PostEntity, string, Post> {
  private repository: { [key: string]: Post } = {};

  public async findById(id: string): Promise<Post> {
    if (this.repository[id]) {
      return { ...this.repository[id] };
    }

    return null;
  }

  public async create(item: PostEntity): Promise<Post> {
    const entry = { ...item.toObject(), _id: crypto.randomUUID() }
    this.repository[entry._id] = entry;
    return { ...entry };
  }

  public async update(id: string, item: PostEntity): Promise<Post> {
    this.repository[id] = { ...item.toObject(), _id: id };
    return this.findById(id);
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }

}
