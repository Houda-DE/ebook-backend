import { Body, Controller, Get, Post , Patch , Delete, Req } from '@nestjs/common';
import { Request } from 'express';
import { ProductDto } from './dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor (private productService : ProductService) {}

    @Post('add')
    addProduct (@Body() dto : ProductDto) {
        console.log(dto)
        return this.productService.addProduct(dto)
    }

    @Get('products')
    findAllProducts(){
        return this.productService.findAllProducts()
    }

    @Get(':id')
    findOneProduct(@Body() dto : ProductDto){
        return this.productService.findOneProduct(dto)
    }

    @Patch(':id')
    modifyProduct(@Body() dto : ProductDto , @Req() req : Request){
        return this.productService.modifyProduct(dto , req)
    }

    @Delete(':id')
    deleteProduct(@Body() dto : ProductDto){
        return this.productService.deleteProduct(dto)
    }
}
