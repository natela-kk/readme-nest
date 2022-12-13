import { Document } from 'mongoose';
import { User } from '@readme/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'users',
})
export class UserModel extends Document implements User {
  @Prop({
    required: true,
  })
  public _id: string;

  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({
    required: true,
  })
  public name: string;

  @Prop({
    required: true,
  })
  public passwordHash: string;

  @Prop()
  public avatar: string;

  @Prop({
    required: true,
  })
  public regDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
