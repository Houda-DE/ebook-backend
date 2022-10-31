import { Controller , Req , Body , Post ,Get , UseGuards , Delete, Param, Patch} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderDto } from './dto/order.dto';
import { OrderService } from './order.service';
import { ParseIntPipe } from '@nestjs/common/pipes';

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
    async getUserOrders(
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

    @Patch('/:id')
    updateAnOrder(@Param('id' , ParseIntPipe) id : number){
        return this.orderServices.updateOrder(id)
    }

    @Delete('/:id')
    deleteOrder(@Param('id' , ParseIntPipe) id : number){
        return this.orderServices.deleteOrder(id)
    }

}