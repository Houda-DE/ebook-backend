import { Body, Controller, Get, Post , Patch , Delete, Param } from '@nestjs/common';
import { ProductDto } from './dto';
import { ProductService } from './product.service';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { category } from '@prisma/client';

@Controller('product')
export class ProductController {

    constructor (private productService : ProductService) {}

    @Post('add')
    addProduct (@Body() dto : ProductDto , cat : category) {
        console.log(dto)
        return this.productService.addProduct(dto , cat)
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
    modifyProduct(@Param('id', ParseIntPipe) id: number , @Body() dto : ProductDto , cat : category){
        return this.productService.modifyProduct(id , dto , cat)
    }

    @Delete(':id')
    deleteProduct(@Param('id', ParseIntPipe) id: number){
        return this.productService.deleteProduct(id)
    }
}
