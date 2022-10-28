import { IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CategorieDto {

    @IsPositive()
    @IsNotEmpty()
    id : number

    @IsNotEmpty()
    @IsString()
    name : string

}