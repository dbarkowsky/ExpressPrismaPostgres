import { MigrationInterface, QueryRunner } from "typeorm"

export class UpdateSeriesTitle1698764327394 implements MigrationInterface {

    // migration code goes here
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "series" RENAME COLUMN "name" TO "title"`,
        )
    }

    // revert whatever was done in up
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "Series" RENAME COLUMN "title" TO "name"`,
        )
    }

}
