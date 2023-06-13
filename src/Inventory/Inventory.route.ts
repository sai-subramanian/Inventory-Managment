import {Response , Request , Router} from "express";
import { AppDataSource } from "../data-source";
import {Inventory} from "../entity/Inventory"
import { InventoryDto } from "./Inventory.dto";
import { checkjwt ,ARequest} from "../middleware/auth.middleware";
import { User } from "../entity/User";
import { pid } from "process";

const router = Router();
const InventoryRepository = AppDataSource.getRepository(Inventory);
const Userrepository = AppDataSource.getRepository(User);

router.get("/h", (req:Request,res:Response)=>{
    res.send("hey you found me ");
    console.log("reached");
});

//to see the users inventory
/* Req Body:
    Inventory NO

    **jwt token
 *///vulnerbility if Inventory Number is not mentioned it will show the full table i.e all invetory of that user
router.get("/",checkjwt,async (req:ARequest,res:Response)=>{
    
    try{
         const body:InventoryDto = req.body;
         const user: User = await Userrepository.findOne({where:{id:req.user.id}});
         
         //checking if the user exists
         if(!user){
             return res.status(400).json({message:"user not found!!"});
         }
 
         //retriving all the products from the common table and from the Inventory of the given inventory no
         const product:Inventory[]  = await InventoryRepository.findBy({UserId:user.id,InventoryNumber:body.InventoryNumber});
 
        return res.status(200).json({products:product});
 
 
     }catch(err){
         return res.status(500).json({message:err.message});
     }
     
 
 });


 //to add a new product in a Particular Inventory No
/* Req Body: (if a new inventory no is created manage from frontend and just pass the new no here)
    inventory no
    Product Name
    Product Price
    no of units
    
    barcode:Nullable

    **jwt token

*///updates that can be added in future: 1) check if the Inventory no is new or not to create a new card in frontend
router.post("/addNew",checkjwt,async (req:ARequest,res:Response)=>{
    
   try{
        const body:InventoryDto = req.body;
        const user: User = await Userrepository.findOne({where:{id:req.user.id}});
        //checking if the user exists

        
        if(!user){
            return res.status(400).json({message:"user not found!!"});
        }

        //checking if the same product exists in the users Inventory  
        const product:Inventory  = await InventoryRepository.findOne({where:{ProductName:body.ProductName,UserId:user.id,InventoryNumber:body.InventoryNumber}});

        if(product){
            throw new Error("Product aldready exists pls update the quantity of the product than inserting new")
        }

        //if product is not present then create a new product instance and add it to the inventory repo(table)
        const new_product:Inventory = new Inventory();
        new_product.InventoryNumber = body.InventoryNumber;
        new_product.ProductName = body.ProductName;
        new_product.ProductPrice = body.ProductPrice;
        new_product.Quantity = body.Quantity;
        new_product.Barcode = body.Barcode;
        new_product.UserId = user.id;

       await InventoryRepository.save(new_product);
        return res.status(200).json({message:"new product added successfully",product:new_product})

    }catch(err){
        return res.status(500).json({message:err.message});
    }
    

});


// add more quantity to a aldready registred product in a particulart Inventory No
/* Request body:
    Product name
    Product quantity
    Inventory No

**jwt token (in header)
*/
router.put("/add",checkjwt,async (req:ARequest,res:Response)=>{
    try{
        const body:InventoryDto = req.body;
        const user:User = await Userrepository.findOne({where:{id:req.user.id}});
    
        //checking if the user exists  
        if(!user){
            return res.status(400).json({message:"user not found!!"});
        }
    
        const product:Inventory = await InventoryRepository.findOne({where:{UserId:user.id,ProductName:body.ProductName,InventoryNumber:body.InventoryNumber}});
        
        //checking if the product exists  
        if(!product){
            return res.status(400).json({message:"product does not exist in this inventory please add as new product "});
        }

        product.Quantity = product.Quantity + body.Quantity;
        await InventoryRepository.update(product.PrimiaryCol,product);
        return res.status(200).json({message:"Inventory updated successfully",product:product})
        
    
    }catch(err){
        return res.status(500).json({message:err.message});
    }
});


// Deduct the recieved quantity of the product from the given Inventory No 
/* Request body:
    Product name
    Product quantity
    Inventory No

**jwt token (in header)
*/
router.put("/checkout",checkjwt,async (req:ARequest,res:Response)=>{
try{
    const body:InventoryDto = req.body;
    const user:User = await Userrepository.findOne({where:{id:req.user.id}});

    //checking if the user exists  
    if(!user){
        return res.status(400).json({message:"user not found!!"});
    }

    const product:Inventory = await InventoryRepository.findOne({where:{UserId:user.id,ProductName:body.ProductName,InventoryNumber:body.InventoryNumber}});
    
    //checking if the product exists  
    if(!product){
        return res.status(400).json({message:"product does not exist in this inventory please add as new product "});
    }

    if(body.Quantity>product.Quantity){
        return res.status(400).json({message:"There isn't enough Product Quantity to checkout"});
    }

    product.Quantity = product.Quantity - body.Quantity;
    await InventoryRepository.update(product.PrimiaryCol,product);
    return res.status(200).json({message:"Inventory updated successfully",product:product})
    

}catch(err){
    return res.status(500).json({message:err.message});
}
});


//Remove a Product completely from inventory
/* Request body:
    Product name
    Inventory No

**jwt token (in header)
*/
router.put("/remove",checkjwt,async (req:ARequest,res:Response)=>{
    try{
        const body:InventoryDto = req.body;
        const user:User = await Userrepository.findOne({where:{id:req.user.id}});
    
        //checking if the user exists  
        if(!user){
            return res.status(400).json({message:"user not found!!"});
        }
    
        const product:Inventory = await InventoryRepository.findOne({where:{UserId:user.id,ProductName:body.ProductName,InventoryNumber:body.InventoryNumber}});
        
        //checking if the product exists  
        if(!product){
            return res.status(400).json({message:"product does not exist in this inventory"});
        }
       
        await InventoryRepository.delete(product.PrimiaryCol);
        return res.status(200).json({message:"Product deleted from Inventory successfully"})
        
    
    }catch(err){
        return res.status(500).json({message:err.message});
    }
    });


module.exports = router;