import { User } from '@readme/shared-types';
import { compare, genSalt, hash } from 'bcrypt';

const SALT_ROUNDS = 10;

export class UserEntity implements User {
  public _id: string;
  public email: string;
  public name: string;
  public passwordHash: string;
  public avatar?: string;
  public regDate: Date;

  constructor(user: User) {
    this.fillEntity(user);
  }

  public toObject() {
    return {...this};
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  public fillEntity(user: User) {
    this._id = user._id;
    this.avatar = user.avatar;
    this.email = user.email;
    this.name = user.name;
    this.passwordHash = user.passwordHash;
    this.regDate = user.regDate;
  }
}
