import { IsOptional } from "class-validator";
import { Double } from "typeorm";

export class InventoryDto{
    
    
    ProductName:string;

    
    ProductPrice:Double;

    
    Quantity:Double;

    

};