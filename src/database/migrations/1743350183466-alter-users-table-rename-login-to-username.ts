import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterUsersTableRenameLoginToUsername1743350183466 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "money_stat"."users" RENAME COLUMN "login" TO "username";`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "money_stat"."users" RENAME COLUMN "username" TO "login";`);
    }
}
