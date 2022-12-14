import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {
    constructor(private prisma : PrismaService , private jwt : JwtService){}
  
    async signup(dto : AuthDto){
        const hash = await argon.hash(dto.password)
        try{
            const user = await this.prisma.user.create({
                data : {
                    email : dto.email,
                    hash,
                    firstName : dto.firstName,
                    lastName : dto.lastName
                }
            })
            return user
        }
        
        catch(error){
            if (error instanceof PrismaClientKnownRequestError){
                //P2002 sends to duplicate users
                if(error.code === 'P2002'){
                    throw new ForbiddenException('Credential taken')
                }
            }
            throw error
        }
    }

    async signin(dto : AuthDto){
        const user = await this.prisma.user.findUnique({
            where : {
                email : dto.email,
            }
        });

        if(!user){
            throw new ForbiddenException('Credentials Incorrect')
        };

        const pwMatches = await argon.verify(
            user.hash,
            dto.password,
        );

        if(!pwMatches){
            throw new ForbiddenException('Credentials Incorrect')
        };

        return this.signToken(user.id , user.email)
    }

   async signToken(userId : number , email : string) : Promise<{access_token : string}> {
        const payload = {
            sub  : userId,
            email
        }

        const token = await this.jwt.signAsync(
            payload,
            {
                expiresIn : '60m',
                secret : 'super-secret'
            }
        )

        return {
            access_token : token,
        }
    }
}
