import { Character } from "./entity/Character";
import { City } from "./entity/Cities";
import { Company } from "./entity/Company";
import { Series } from "./entity/Series";
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
    entities: ["./entity/*.ts"],
    subscribers: [],
    migrations: [],
})

export default AppDataSource;

