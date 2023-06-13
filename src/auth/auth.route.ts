import {Response , Request , Router} from "express";
import {User} from "../entity/User";
import { QueryBuilder } from "typeorm";
import { AppDataSource } from "../data-source";
import { authDto } from "./auth.dto";
import {passwordHash} from "../security/passwordHash"
import { userDto } from "../user/user.dto";
import {authuserDto} from "./authuser.dto"
import { JWT } from "../security/jwt";
import {loginDto} from "./authuser.dto"
const router = Router();
const userRepository = AppDataSource.getRepository(User);

// to handle new users
router.post("/signup", async (req:Request,res:Response)=>{
    try{
      const body:userDto = req.body;
      const newuser:User = await new User;
      
      const email = body.email;
      const user:User = await userRepository.findOne({where:{email:email}});
      //checking if the email is aldready in use
    
      if(user){
        throw new Error("Email is aldready in use");
      }
      newuser.age = body.age;
      newuser.email = body.email;
      newuser.password = await passwordHash.hashPassword(body.password);
      newuser.FirstName = body.Firstname;

      //for returning the user and jwt token

      const authencationDto:authDto = new authDto();
      const authuser:authuserDto = new authuserDto();
       authuser.Firstname = body.Firstname;
       authuser.age =  body.age;
       authuser.email = body.email;     


      await userRepository.save(newuser);
      authencationDto.user = authuser;
    
      //implementation of token genrator and refreshToken generator

      authencationDto.token = await JWT.generateToken(newuser);


      return res
      .status(200)
      .json({message:"new user created!!",authencationDto})}catch(err){
        res.status(500).json({message:err.message});
      };
    });


    router.post("/login",async (req:Request,res:Response)=>{
      try{
      const body:loginDto = req.body;
      const user_signin:User = await userRepository.findOne({where:{email:body.email}});
       
      if( ! await passwordHash.comppassword(body.password,user_signin.password)){
       

        return res.status(200).json({message:"Incorrect password!!"});
      }

      const authencationDto:authDto = new authDto();
      const authuser:authuserDto = new authuserDto();
       authuser.Firstname = user_signin.FirstName;
       authuser.age =  user_signin.age;
       authuser.email = user_signin.email;

      
      authencationDto.token = await JWT.generateToken(user_signin);

      return res
      .status(200)
      .json({message:"user logged in successfully",authencationDto})}catch(err){
        res.status(500).json({message:err.message});
      };
      
    });

    module.exports = router;


    /* test credentials:
    {
    
    "password":"abc",
    "email":"abc@gmail.com"
      

}
*/