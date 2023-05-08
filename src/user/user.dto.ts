import { IsOptional } from "class-validator";
import {Column} from "typeorm"

export class userDto{

    @IsOptional()
    firstname:string;

    @IsOptional()
    email:string;

    @IsOptional()
    age:number;

    @IsOptional()
    password:string;
}