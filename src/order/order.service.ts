import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {

    constructor(private prisma : PrismaService){}

    async createAnOrder(dto : OrderDto , userId : number){
        try {
            let products = { connect: [] };

            const product = [1 , 7]
    
            if (product) {
            products = {
                connect: product.map((category) => {
                return { id: category };
                }),
            };
            }
            return await this.prisma.order.create({
                data : {
                    userId,
                    products
                }
            })
        }
        catch(error){
            throw error
        }
    }

    async getAllOrders(){
        return this.prisma.order.findMany({
            include : {
                products : true,
                user : true
            }
        })
    }

    async updateOrder(id : number){
        let products = { connect: [] };

            const product = [1 , 8]
    
            if (product) {
            products = {
                connect: product.map((category) => {
                return { id: category };
                }),
            };
        }

        await this.prisma.order.update({
            where : {
                id : id
            },
            data : {
                products
            }
        })

        return this.getAllOrders()
    }

   async deleteOrder(id : number){
        await this.prisma.order.delete({
            where : {
                id : id
            },
            include : {
                user : true,
                products : true
            }
        })
        return this.getAllOrders()
   }

}
