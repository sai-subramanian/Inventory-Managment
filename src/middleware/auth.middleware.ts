import {JWT} from "../security/jwt"
const jwt = require("jsonwebtoken");


export const checkjwt= async (req,res,next)=>{
    const token = req.headers.authorization;

    if(!token){
        res.status(401).json({message:"no token provided"});
    }

    try{

        const decoded_jwt = jwt.decoded_jwt(token);
        req.user = decoded_jwt;

        // Move to the next middleware or route handler
        next();

    }catch(err){
        return res.status(500).json({message:err.message})
    }
} 