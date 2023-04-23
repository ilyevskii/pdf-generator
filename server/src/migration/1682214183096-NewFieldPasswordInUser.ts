import { MigrationInterface, QueryRunner } from "typeorm";

export class NewFieldPasswordInUser1682214183096 implements MigrationInterface {
    name = 'NewFieldPasswordInUser1682214183096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    }

}
