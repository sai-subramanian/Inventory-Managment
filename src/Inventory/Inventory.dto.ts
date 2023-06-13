import { IsOptional } from "class-validator";
import { Double } from "typeorm";

export class InventoryDto{
    
    
    ProductName:string;

    
    ProductPrice:number;

    
    Quantity:number;

    InventoryNumber:number;

    @IsOptional()
    Barcode:number;

};