import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductDto } from './dto';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { category } from '@prisma/client';


@Injectable()
export class ProductService {

    constructor (private prisma : PrismaService){}

    async addProduct (dto : ProductDto , cat : category) { 
        try {
            const product = await this.prisma.product.create({
                data : {
                    name : dto.name,
                    description : dto.description,
                    quantity : dto.quantity,
                    imageUrl : dto.imageUrl,
                    prix : dto.price,
                    categories : {
                        connect : {
                            id : cat.id             
                        }
                    }
                }
            })
        }
        catch(error) {
            if (error instanceof PrismaClientKnownRequestError){
                //P2002 sends to duplicate users
                if(error.code === 'P2002'){
                    throw new ForbiddenException('Credential taken')
                }
            }
            throw error
        }
    }

    async findAllProducts(){
        return await this.prisma.product.findMany()
    }

    async findOneProduct(id: number){
       try {
            return await this.prisma.product.findUniqueOrThrow({
                where : {
                    id  : id
                },
            })
       }
       catch(error){
            throw error
       }
    }

    async modifyProduct(id : number , dto : ProductDto , cat : category){
        return await this.prisma.product.update({
            where :  {
                id : id
            },
            data : {
                name : dto.name,
                description : dto.description,
                quantity : dto.quantity,
                imageUrl : dto.imageUrl,
                prix : dto.price,
                categories : {
                    connect : {
                        id : cat.id             
                    }
                }
            }
        })
    }

    async deleteProduct(id : number){
        try{
            await this.prisma.product.delete({
                where : {
                    id : id
                }
            })
            return this.findAllProducts()
        }
        catch (error) {
            throw error
        }
    }

}
