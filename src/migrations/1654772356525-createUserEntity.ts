import { MigrationInterface, QueryRunner } from "typeorm";

export class createUserEntity1654772356525 implements MigrationInterface {
    name = 'createUserEntity1654772356525'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "userEntity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_baf5713e876ad3b335ddf92b6c0" UNIQUE ("username"), CONSTRAINT "UQ_3f841889f4dc823c5f6860b02f5" UNIQUE ("email"), CONSTRAINT "PK_d4b56ca59d9c701d9d38847cbf6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "userEntity"`);
    }

}
