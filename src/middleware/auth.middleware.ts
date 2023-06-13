import {JWT} from "../security/jwt"
const jwt = require("jsonwebtoken");
import { Request } from "express";
const JWT_SECRET = "1234";
//custom type declaration which extends the calss Request so as to inform typescript about the existance of user property on the request 
//which becomes the new type ARequest
export interface ARequest extends Request {
    user: any;
  }
  
export const checkjwt= async (req,res,next)=>{
    const token = req.headers.authorization;

    if(!token){
        res.status(401).json({message:"no token provided"});
    }

    try{
        //console.log(token)
        const decoded_jwt = jwt.verify(token,JWT_SECRET);
        req.user = decoded_jwt;

        // Move to the next middleware or route handler
        next();

    }catch(err){
        return res.status(500).json({message:err.message})
    }
} 