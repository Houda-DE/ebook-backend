import { Controller , Req , Body , Post ,Get , UseGuards} from '@nestjs/common';
import { Request } from 'express';
import { userInfo } from 'os';
import { JwtGuard } from 'src/auth/guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderDto } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {

    constructor(private orderServices : OrderService ,  private prisma : PrismaService){}


    @Post('add')
    @UseGuards(JwtGuard)
    createOrder(
        @Req() req : any ,
        @Body() dto : OrderDto,
    ){
        const userId = req.user.id
        return this.orderServices.createAnOrder(dto , userId)
    }

    @Get('orders')
    getAllOrders(){
        return this.orderServices.getAllOrders()
    }

    @Get('myOrders')
    @UseGuards(JwtGuard)
    async getUserOrder(
        @Req() req : any ,
    ){
        const userId = req.user.id
        console.log(userId)
        return await this.prisma.order.findMany({
            where : {
                userId : userId
            }
        })
    }

}