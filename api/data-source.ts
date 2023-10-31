import { Character } from "./entity/Character";
import { City } from "./entity/Cities";
import { Company } from "./entity/Company";
import { Series } from "./entity/Series";
import {DataSource} from "typeorm";
import dotenv from 'dotenv';
dotenv.config()

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: "postgres",
    synchronize: true,
    logging: true,
    entities: ["./entity/*.ts"],
    subscribers: [],
    migrations: [],
})

export default AppDataSource;

