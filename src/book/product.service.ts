import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductDto } from './dto';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { category } from '@prisma/client';
import { CategorieDto } from 'src/categorie/dto';


@Injectable()
export class ProductService {

    constructor (private prisma : PrismaService){}

    async addProduct (dto : ProductDto , categorie : number[] , author : number[]){ 
        try {
            let categories = { connect: [] };
    
            if (categorie) {
                categories = {
                    connect: categorie.map((category) => {
                    return { id: category };
                    }),
                };
            }

            let authors = { connect: [] };
    
            if (author) {
                authors = {
                    connect: categorie.map((idAuth) => {
                    return { id: idAuth };
                    }),
                };
            }

            return await this.prisma.book.create({
                data : {
                    name : dto.name,
                    description : dto.description,
                    quantity : dto.quantity,
                    imageUrl : dto.imageUrl,
                    prix : dto.price,
                    categories,
                },
                include : {
                    categories : true
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
        return await this.prisma.book.findMany({
            include : {
                categories : true,
            }
        })
    }

    async findOneProduct(id: number){
       try {
            return await this.prisma.book.findUniqueOrThrow({
                where : {
                    id  : id
                },
                include : {
                    categories : true,
                }
            })
       }
       catch(error){
            throw error
       }
    }

    async modifyProduct(id : number , dto : ProductDto){
        return await this.prisma.book.update({
            where :  {
                id : id
            },
            data : {
                name : dto.name,
                description : dto.description,
                quantity : dto.quantity,
                imageUrl : dto.imageUrl,
                prix : dto.price,
            }
        })
    }

    async deleteProduct(id : number){
        try{
            await this.prisma.book.delete({
                where : {
                    id : id
                },
                include : {
                    categories : true,
                }
            })
            return this.findAllProducts()
        }
        catch (error) {
            throw error
        }
    }

}
