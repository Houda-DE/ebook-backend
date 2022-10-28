import { IsNotEmpty, isNumber, IsNumber, IsPositive, IsString } from "class-validator"

export class ProductDto {

    @IsNotEmpty()
    @IsString()
    name : string

    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    price : number

    @IsNotEmpty()
    @IsString()
    description : string

    @IsNotEmpty()
    @IsString()
    imageUrl : string

    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    quantity : number

}