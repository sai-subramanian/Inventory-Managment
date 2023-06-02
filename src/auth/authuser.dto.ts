import { IsOptional } from "class-validator";

export class authuserDto{
    @IsOptional()
    id:number;

    Firstname:string;

    email:string;

    age:number;

    token:string;
   
}
