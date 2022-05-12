import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import compare from 'bcryptjs';
import { IUser } from 'src/user/inteface/user.interface';
import { UserService } from '../user/user.service';
import { UserDocument } from '../user/schemas/schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(user: IUser) {
    return this.usersService.register(user);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    if (!username)
      throw new HttpException('Username is mandatory', HttpStatus.BAD_REQUEST);
    if (!pass)
      throw new HttpException('Password is mandatory', HttpStatus.BAD_REQUEST);
    const user = await this.usersService.findByName(username);
    const isPasswordMatching = await compare(pass, user.password);
    if (!user || !isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
    user.password = undefined;
    return user;
  }
  async login(user: UserDocument) {
    console.log('login*****');
    console.log(user);

    const payload = {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      user: { id: user._id, email: user.username, sub: user.username },
    };
    return {
      hi: 'hi',
      access_token: this.jwtService.sign(payload),
    };
  }
}
