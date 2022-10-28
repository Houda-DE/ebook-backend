import { Module } from '@nestjs/common';
import { CategorieService } from './categorie.service';
import { CategorieController } from './categorie.controller';

@Module({
  providers: [CategorieService],
  controllers: [CategorieController]
})
export class CategorieModule {}
