import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { EphemeralKeyInfo } from 'tls';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor( private prisma : PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'super-secret',
    });
  }

  async validate(payload: {
    sub : number,
    email : string 
  }) {
    const user = await this.prisma.user.findUnique({
      where : {
        id : payload.sub
      }
    })
    delete user.hash
    return user;
  }
}