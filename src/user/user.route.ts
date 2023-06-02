import {Response , Request , Router} from "express";
import {User} from "../entity/User";
import { QueryBuilder } from "typeorm";
import { AppDataSource } from "../data-source";
import { userDto } from "./user.dto";
import {passwordHash} from "../security/passwordHash"

const router = Router();
const userRepository = AppDataSource.getRepository(User);

router.get("/h", (req:Request,res:Response)=>{
    res.send("hey you found me ");
    console.log("reached");
});


/* to be completed after auth is done
//to handle the updation of existing users
 // has error

router.put("/update/:id", async (req:Request,res:Response)=>{
  const uid = parseInt(req.u);
  const body: userDto = req.body;

  const existingUser = await userRepository.findOne({
    where: {
      id: uid,
    },
  });
  if(!existingUser){
    return res.status(404).json({message:"User not found"});
  }

  existingUser.FirstName = body.Firstname;
  existingUser.age = body.age;

  //to change password

 const updated_user = await userRepository.save(existingUser);

  //logic to check if user is updated or not


  res.status(200).json({message:"user updated successfully!!"})
 
    
   
});
   
*/

module.exports = router;