import constants from './constants';
import app from './express';
import AppDataSource from './data-source';
import { Company } from './typeorm/entity/Company';
import { Series } from './typeorm/entity/Series';
import { City } from './typeorm/entity/Cities';
import { Character } from './typeorm/entity/Character';

const { API_PORT } = constants;

AppDataSource.initialize()
    .then(async () => {

        // const jsonIn = JSON.stringify(seedData);
        // const jsonParse = JSON.parse(jsonIn);
        // const companies = jsonParse.companies;
        // console.log(jsonParse);
        // console.log(JSON.stringify(companies));
        console.log("Data Source has been initialized!")

        //clear out tables
        await AppDataSource
            .createQueryBuilder()
            .delete()
            .from(Character)
            .execute();

        await AppDataSource
            .createQueryBuilder()
            .delete()
            .from(City)
            .execute();  
        await AppDataSource
            .createQueryBuilder()
            .delete()
            .from(Series)
            .execute();

        await AppDataSource
            .createQueryBuilder()
            .delete()
            .from(Company)
            .execute();

        // enter new data
        // await AppDataSource
        //     .createQueryBuilder()
        //     .insert()
        //     .into(City)
        //     .values([
        //         { name: "New York City", lat: 40.7595968, long: -73.9776144 },
        //         { name: 'Moscow', lat: 55.727886, long: 37.671269 },
        //         { name: 'Oslo', lat: 59.911889, long: 10.745646 },
        //         { name: 'New Delhi', lat: 28.598189, long: 77.141004 }
        //     ])
        //     .execute();

        // const cityManager = await AppDataSource.getRepository(City);
        // const NYC = await cityManager.findOneBy({ name: "New York City" })
        // const moscow = await cityManager.findOneBy({ name: "Moscow" })

        
            
        // await AppDataSource
        //     .createQueryBuilder()
        //     .insert()
        //     .into(Company)
        //     .values([
        //         { name: "DC" },
        //         { name: "Marvel" }
        //     ])
        //     .execute();

        // const companyRepo = await AppDataSource.getRepository(Company);
        // const marvel = await companyRepo.findOneBy({ name: "Marvel" });
        // const DC = await companyRepo.findOneBy({ name: "DC" });

        // await AppDataSource
        //     .createQueryBuilder()
        //     .insert()
        //     .into(Series)
        //     .values([
        //         { name: "Avengers", firstIssue: new Date("1991-02-04"), company: marvel },
        //         { name: "Superman", firstIssue: new Date("1991-04-04"), company: DC },
        //         { name: "Iron Man", firstIssue: new Date("1981-02-04"), company: marvel },
        //         { name: "Justice League", firstIssue: new Date("1971-02-04"), company: DC },
        //         { name: "Wizards Weekly", firstIssue: new Date("1991-02-04"), company: marvel }
        //     ])
        //     .execute();

        // await AppDataSource
        //     .createQueryBuilder()
        //     .insert()
        //     .into(Character)
        //     .values([
        //         { name: 'Superman', height: 191,
        //             city: await cityManager.save({
        //                 name: "Metropolis", lat: 28.598189, long: 77.141004
        //             }) },
        //         { name: 'Hulk', height: 250, city: await cityManager.findOneBy({name: "New Delhi"}) },
        //         { name: 'Iron Man', height: 185, city: NYC },
        //         { name: 'Dr. Strange', height: 183, city: NYC },
        //         { name: 'Black Widow', height: 164, city: moscow }
        //     ])
        //     .execute();

    })
    .catch((err: any) => {
        console.error("Error during Data Source initialization", err)
    })

app.listen(API_PORT, (err?: Error) => {
  if (err) console.log(err);
  console.info(`Server started on port ${API_PORT}.`);
});
