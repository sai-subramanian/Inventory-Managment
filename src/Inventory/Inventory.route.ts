import {Response , Request , Router} from "express";
import { AppDataSource } from "../data-source";
import {Inventory} from "../entity/Inventory"
import { InventoryDto } from "./Inventory.dto";

const router = Router();
const InventoryRepository = AppDataSource.getRepository(Inventory);

router.get("/h", (req:Request,res:Response)=>{
    res.send("hey you found me ");
    console.log("reached");
});

router.post("/addNew",async (req:Request,res:Response)=>{

    const body:InventoryDto = req.body;

    //checking if the same product exists in the users Inventory  
    const product:Inventory  = await InventoryRepository.findOne({where:{ProductName:body.ProductName,/*UserId:uid */}});

    if(product){
        throw new Error("Product aldready exists pls update the quantity of the product than inserting new")
    };
    

});





module.exports = router;