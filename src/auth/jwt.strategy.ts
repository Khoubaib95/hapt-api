import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../app_constant/const';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    console.log('jwtConstants.jwt_secret ', jwtConstants.jwt_secret);
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.jwt_secret,
    });
    console.log('jwtConstants.jwt_secret ', jwtConstants.jwt_secret);
  }

  async validate(payload: any) {
    return { userId: payload.sub };
  }
}
