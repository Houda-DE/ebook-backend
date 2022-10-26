import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport'
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';

@Controller('user')
export class UserController {
    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@Req() req : Request) {
        console.log({
            user : req.user,
        })
        return req.user
    }
}
