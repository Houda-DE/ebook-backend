import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductDto } from './dto';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { Request } from 'express';

@Injectable()
export class ProductService {

    constructor (private prisma : PrismaService){}

    async addProduct (dto : ProductDto) { 
        try {
            const product = await this.prisma.product.create({
                data : {
                    name : dto.name,
                    description : dto.description,
                    quantity : dto.quantity,
                    imageUrl : dto.imageUrl,
                    prix : dto.price,
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

    async findOneProduct(dto : ProductDto){
       try {
            return await this.prisma.product.findUniqueOrThrow({
                where : {
                    name : dto.name
                },
                select : {
                    name : true,
                    id : true,
                    description : true,
                    imageUrl : true,
                    prix : true,
                    quantity : true,
                }
            })
       }
       catch(error){
            throw error
       }
    }

    async modifyProduct(dto : ProductDto , req : Request){
        try{
            return this.prisma.product
        }
        catch (error) {
            throw error
        }
    }

    async deleteProduct(dto : ProductDto){
        try{

        }
        catch (error) {
            throw error
        }
    }

}
