import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Inventory } from "./entity/Inventory"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1234",
    database: "InventoryApp",
    synchronize: true,
    logging: false,
    entities: [User,Inventory],
    migrations: [],
    subscribers: [],
})
