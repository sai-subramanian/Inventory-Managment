import {Response , Request , Router} from "express";
import {User} from "../entity/User";
import { QueryBuilder } from "typeorm";
import { AppDataSource } from "../data-source";

const router = Router();
const userRepository = AppDataSource.getRepository(User);
router.get("/h", (req:Request,res:Response)=>{
    res.send("hey you found me ");
    console.log("reached");
});

// to handle new users
router.post("/new", async (req:Request,res:Response)=>{
const {name,email,password,age} = req.body;
const newuser:User = await new User;

newuser.age = age;
newuser.email = email;
newuser.password = password;
newuser.firstName = name;

await userRepository.save(newuser);
return res
.status(200)
.json({message:"new user created!!"})
});


//to handle the updation of existing users
/*
router.put("/update", (req:Request,res:Response)=>{
    const uid = req.params;
    const {name,email,password,age} = req.body;
    const newuser = new User;
    
   
});
  */  


module.exports = router;