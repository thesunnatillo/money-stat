import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterUsersTableAddEmailColumn1743349318549 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          `ALTER TABLE "money_stat"."users" ADD COLUMN "email" VARCHAR(100)`,
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          `ALTER TABLE "money_stat"."users" ALTER COLUMN "email" DROP DEFAULT`,
        );
      }

}
