import { Body, Controller, Get, Post , Patch , Delete, Param } from '@nestjs/common';
import { Request } from 'express';
import { ProductDto } from './dto';
import { ProductService } from './product.service';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { HttpStatus } from '@nestjs/common/enums';
import { CategorieDto } from 'src/categorie/dto';
import { category } from '@prisma/client';

@Controller('product')
export class ProductController {

    constructor (private productService : ProductService) {}

    @Post('add')
    addProduct (@Body() dto : ProductDto , id : number) {
        console.log(dto)
        return this.productService.addProduct(dto , id)
    }

    @Get('products')
    findAllProducts(){
        return this.productService.findAllProducts()
    }

    @Get(':id')
    findOneProduct(@Param('id', ParseIntPipe) id: number){
        console.log(id)
        console.log('ani hna')
        return this.productService.findOneProduct(id)
    }


    @Patch(':id')
    modifyProduct(@Param('id', ParseIntPipe) id: number , @Body() dto : ProductDto){
        return this.productService.modifyProduct(id , dto)
    }

    @Delete(':id')
    deleteProduct(@Param('id', ParseIntPipe) id: number){
        return this.productService.deleteProduct(id)
    }
}
