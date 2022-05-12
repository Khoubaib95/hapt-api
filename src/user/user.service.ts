import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import hash from 'bcryptjs';
import { IUser } from './inteface/user.interface';
import { UserDocument, User } from './schemas/schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: IUser): Promise<UserDocument> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async register(user: IUser): Promise<UserDocument> {
    if (!user.username || user.username === '') {
      throw new HttpException(
        'Email fied is mandatory',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!user.password || user.password === '') {
      throw new HttpException(
        'Password fied is mandatory',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await hash(user.password, 10);
    try {
      const createdUser = await this.create({
        username: user.username,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      if (error?.code === 11000) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async find(): Promise<UserDocument[]> {
    return this.userModel.find();
  }

  async findById(_id: string): Promise<UserDocument | undefined> {
    return this.userModel.findOne({ _id });
  }

  async findByName(username: string): Promise<UserDocument | undefined> {
    return this.userModel.findOne({ username });
  }

  async update(id: string, user: IUser): Promise<any> {
    if (!user.username || user.username === '') {
      throw new HttpException(
        'Email fied is mandatory',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!user.password || user.password === '') {
      throw new HttpException(
        'Password fied is mandatory',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await hash(user.password, 10);
    return this.userModel.updateOne(
      { _id: id },
      { ...user, password: hashedPassword },
    );
  }

  async delete(id: string): Promise<any> {
    return this.userModel.deleteOne({ _id: id });
  }
}
