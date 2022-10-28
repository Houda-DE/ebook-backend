import { Injectable } from '@nestjs/common';
import { stringify } from 'querystring';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductDto } from './dto';

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
            throw error
        }
    }
}
