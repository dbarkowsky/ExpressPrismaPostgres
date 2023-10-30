import { User } from "./entity/User";
import {DataSource} from "typeorm";

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "admin",
    password: "admin",
    database: "postgres",
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [],
})

export default AppDataSource;


// once we have things set up we can use something like this to make connections 
// sauce:
// https://orkhan.gitbook.io/typeorm/docs/data-source
// import { AppDataSource } from "./app-data-source"
//import { User } from "../entity/User"

//export class UserController {
//    @Get("/users")
//    getAll() {
//        return AppDataSource.manager.find(User)
//    }
//}