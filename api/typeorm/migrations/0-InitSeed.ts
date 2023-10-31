import { MigrationInterface, QueryRunner } from "typeorm"
import { Character } from '../entity/Character'
import { City } from '../entity/Cities'
import { Company } from '../entity/Company'
import { Series } from '../entity/Series'

export class InitSeed1698785138705 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // make connection to database
        await queryRunner.connect();

        // set up managers for tables
        const cityManager = await queryRunner.connection.getRepository(City);
        //const characterManager = await queryRunner.connection.getRepository(Character);
        //const companyManager = await queryRunner.connection.getRepository(Company);
        //const seriesManager = await queryRunner.connection.getRepository(Series)

        const newCity = new City
        newCity.name = "Victoria"
        newCity.lat = 1
        newCity.long = 0
        cityManager.save(newCity)

        // release the connection
        //await queryRunner.release();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
