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
    //entities: [Post, Category],
    subscribers: [],
    migrations: [],
})

export default AppDataSource;
