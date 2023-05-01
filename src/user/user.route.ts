import {Response , Request , Router} from "express";
import {User} from "../entity/User";
import { QueryBuilder } from "typeorm";
import { AppDataSource } from "../data-source";
import { userDto } from "./user.dto";

const router = Router();
const userRepository = AppDataSource.getRepository(User);

router.get("/h", (req:Request,res:Response)=>{
    res.send("hey you found me ");
    console.log("reached");
});

// to handle new users
router.post("/new", async (req:Request,res:Response)=>{
try{
  const body:userDto = req.body;
  const newuser:User = await new User;
  const email = body.email

  //checking if the email is aldready in use
  if(userRepository.findOne({where:{email:email}})){
    throw new Error("Email is aldready in use");
  }

  newuser.age = body.age;
  newuser.email = body.email;
  newuser.password = body.password;
  newuser.firstName = body.Firstname;

  await userRepository.save(newuser);
  return res
  .status(200)
  .json({message:"new user created!!"})}catch(err){
    res.status(500).json({message:err.message})
  }
});


//to handle the updation of existing users

router.put("/update", async (req:Request,res:Response)=>{
  const uid = parseInt(req.params.id);
  const body: userDto = req.body;

  const existingUser = await userRepository.findOne({
    where: {
      id: uid,
    },
  });
    
   
});
   


module.exports = router;