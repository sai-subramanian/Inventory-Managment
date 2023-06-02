import { IsOptional } from "class-validator";

export class userDto{

    @IsOptional()
    Firstname:string;

    @IsOptional()
    email:string;

    @IsOptional()
    age:number;

    @IsOptional()
    password:string;
}