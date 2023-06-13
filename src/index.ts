import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import * as express from "express"
import {Request,Response} from "express"

const app = express();
const port = 3000;
app.listen(port,()=>{console.log("Listening on port",port)});
app.use(express.json());

AppDataSource.initialize().then(async () => {
    console.log("database started");    
}).catch(error => console.log(error))
    

app.get("/",(req:Request,res:Response)=>{
res.send("hello world");
console.log("hello world")
});

app.use("/auth",require("./auth/auth.route"))
app.use("/user",require("./user/user.route"));
app.use("/inv",require("./Inventory/Inventory.route"));
//app.use("/Inv",require("./Inventory/Inventory.route"));



