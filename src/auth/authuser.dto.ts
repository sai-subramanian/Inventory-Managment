import { IsOptional } from "class-validator";

export class authuserDto{
    @IsOptional()
    id:number;

    Firstname:string;

    email:string;

    age:number;

   
}


export class loginDto{
    email:string;

    password:string;
}