import { MigrationInterface, QueryRunner } from "typeorm";

export class NewImageAndPdfFieldsInUser1682223403061 implements MigrationInterface {
    name = 'NewImageAndPdfFieldsInUser1682223403061'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "image" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "pdf" bytea`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "pdf"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "image"`);
    }

}
