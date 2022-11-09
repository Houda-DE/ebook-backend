import { Module } from '@nestjs/common';
import { ProductService } from './book.service';
import { ProductController } from './book.controller';

@Module({
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}
