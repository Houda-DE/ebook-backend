import { Body, Controller, Post } from '@nestjs/common';
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
}
