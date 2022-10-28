import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategorieDto } from './dto';
import { ForbiddenException } from '@nestjs/common/exceptions';

@Injectable()
export class CategorieService {

    constructor(private prisma : PrismaService){}

    async createCategorie(dto : CategorieDto){
        try{
            const categorie = await this.prisma.category.create({
                data : {
                    name: dto.name
                }
            })
            return categorie
        }
        catch(error){
            if (error instanceof PrismaClientKnownRequestError){
                //P2002 sends to duplicate users
                if(error.code === 'P2002'){
                    throw new ForbiddenException('Credential taken')
                }
            }
            throw error
        }
    }

    async allCategories(){
        return await this.prisma.category.findMany()
    }

    async oneCategorie(id : number){
        return await this.prisma.category.findUniqueOrThrow({
            where : {
                id : id
            }
        })
    }

    async modifyCategoris(id : number , dto : CategorieDto){
        await this.prisma.category.update({
            where : {
                id : id
            },
            data : {
                name: dto.name
            }
        })
    }

    async deleteCategoris(id : number){
        await this.prisma.category.delete({
            where : {
                id : id
            }
        })
        return this.allCategories()
    }

}
