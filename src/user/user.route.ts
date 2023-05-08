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
  const email = body.email;
  const user:User = await userRepository.findOne({where:{email:email}});
  //checking if the email is aldready in use

  if(user){
    throw new Error("Email is aldready in use");
  }

  newuser.age = body.age;
  newuser.email = body.email;
  newuser.password = body.password;
  newuser.firstName = body.firstname;

  await userRepository.save(newuser);
  return res
  .status(200)
  .json({message:"new user created!!"})}catch(err){
    res.status(500).json({message:err.message});
  };
});


//to handle the updation of existing users
/* // has error

router.put("/update/:id", async (req:Request,res:Response)=>{
  const uid = parseInt(req.params.id);
  const body: userDto = req.body;

  const existingUser = await userRepository.findOne({
    where: {
      id: uid,
    },
  });
  if(!existingUser){
    return res.status(404).json({message:"User not found"});
  }

  existingUser.firstName = body.Firstname;
  existingUser.age = body.age;
  //to change password

 const updated_user = await userRepository.save(existingUser);

  //logic to check if user is updated or not


  res.status(200).json({message:"user updated successfully!!"})
 
    
   
});
   
*/

module.exports = router;