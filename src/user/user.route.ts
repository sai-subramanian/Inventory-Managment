import {Response , Request , Router} from "express";
import {User} from "../entity/User";
import { QueryBuilder } from "typeorm";

const router = Router();
router.get("/h", (req:Request,res:Response)=>{
    res.send("hey you found me ");
    console.log("reached");
    });

router.post("/new", (req:Request,res:Response)=>{

});


module.exports = router;