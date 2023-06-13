import { Entity, PrimaryGeneratedColumn, Column} from "typeorm"
import {IsOptional} from "class-validator"
@Entity()
export class Inventory{
    @PrimaryGeneratedColumn()
    PrimiaryCol: number ;

    @Column()
    UserId:number;

    @Column()
    InventoryNumber:number;

    @Column()
    ProductName:string;

    @Column()
    ProductPrice:number;

    @Column()
    Quantity:number;


    @Column({nullable:true}) //optional
    @IsOptional()
    Barcode:number

 //date of restock
 //last when qty went out 
}