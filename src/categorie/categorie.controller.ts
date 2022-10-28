import { Controller , Post , Get , Patch , Delete , Param , Body} from '@nestjs/common';
import { CategorieService } from './categorie.service';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { CategorieDto } from './dto';

@Controller('categorie')
export class CategorieController {

    constructor(private categorieService : CategorieService){}

    @Post('add')
    createCategorie(@Body() dto : CategorieDto){
        return this.categorieService.createCategorie(dto)
    }

    @Get('categories')
    allCategories(){
        return this.categorieService.allCategories()
    }

    @Get(':id')
    oneCategorie(@Param( 'id' , ParseIntPipe) id : number){
        return this.categorieService.oneCategorie(id)
    }

    @Patch(':id')
    ModifyCategorie(@Param( 'id' , ParseIntPipe) id : number , @Body() dto : CategorieDto){
        return this.categorieService.modifyCategoris(id , dto)
    }

    @Delete(':id')
    DeleteCategorie(@Param( 'id' , ParseIntPipe) id : number){
       return this.categorieService.deleteCategoris(id)  
    }

}
