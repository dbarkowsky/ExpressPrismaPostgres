import { MigrationInterface, QueryRunner } from "typeorm"
import AppDataSource from "../../data-source"
import { Company } from "../../typeorm/entity/Company";
import { City } from "./../../typeorm/entity/Cities";
import { Series } from "./../../typeorm/entity/Series";
import { Character } from "./../../typeorm/entity/Character";

import seedData from "../seed/seed.json";

export class Migrationwithjson1698876414342 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        let jsonData = JSON.stringify(seedData);

        const companyData = JSON.parse(jsonData).companies;
        const cityData = JSON.parse(jsonData).cities;
        const seriesData = JSON.parse(jsonData).series;
        const characterData = JSON.parse(jsonData).characters;

        console.log(characterData);

        await AppDataSource.createQueryBuilder()
            .insert()
            .into( Company )
            .values( companyData )
            .execute();

        await AppDataSource.createQueryBuilder()
            .insert()
            .into( City )
            .values( cityData )
            .execute();

        await AppDataSource.createQueryBuilder()
            .insert()
            .into( Series )
            .values( seriesData )
            .execute();

        await AppDataSource.createQueryBuilder()
            .insert()
            .into( Character )
            .values( characterData )
            .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
