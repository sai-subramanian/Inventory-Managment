import * as jwt from "jsonwebtoken"
import { User } from "../entity/User";
import {v4 as uuidv4} from "uuid";

export class JWT{
    private static JWT_SECRET = "1234";
    public static async generateToken(user:User){
        const payload = {
            id:user.id,
            email:user.email
        };
        
        const token = jwt.sign(payload,this.JWT_SECRET,{ // creating a token and sending it 
            expiresIn:"1h", // specifing when the token will expire
            jwtid: uuidv4(), // for generating unique tokens for refresh token * (have to check)
            subject: user.id.toString(), //specifing the users primary key
        });

        return token;
    }
}