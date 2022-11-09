import { Body, Controller, Get, Post , Patch , Delete, Param } from '@nestjs/common';
import { ProductDto } from './dto';
import { BookService } from './book.service';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { category } from '@prisma/client';

@Controller('book')
export class BookController {

    constructor (private bookService : BookService) {}

    @Post('add')
    addBook (@Body() dto : ProductDto , cat : [1 , 2] , auth : [1 , 2]) {
        console.log(dto)
        return this.bookService.addBook(dto , cat , auth)
    }

    @Get('products')
    findAllProducts(){
        return this.bookService.findAllBooks()
    }

    @Get(':id')
    findOneProduct(@Param('id', ParseIntPipe) id: number){
        console.log(id)
        console.log('ani hna')
        return this.bookService.findOneBook(id)
    }


    @Patch(':id')
    modifyProduct(@Param('id', ParseIntPipe) id: number , @Body() dto : ProductDto , cat : category){
        return this.bookService.modifyBook(id , dto)
    }

    @Delete(':id')
    deleteProduct(@Param('id', ParseIntPipe) id: number){
        return this.bookService.deleteBook(id)
    }
}
