import { IsOptional } from "class-validator";
import { authuserDto } from "./authuser.dto";

export class authDto{
    token:string;
    
    refreshToken:string;

    user:authuserDto;
  authencationDto: import("/home/sai/Data/projects/Inventory-Managment/src/entity/User").User;
}