import { IsNotEmpty, IsNumber , IsArray } from "class-validator";

export class OrderDto {

    @IsNotEmpty()
    @IsNumber()
    amount : number

    @IsArray()
    @IsNotEmpty()
    products : number[]

}