import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterColumnStatusToDefaultValue1742889934475
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "money_stat"."users" ALTER COLUMN "status" SET DEFAULT 'active'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "money_stat"."users" ALTER COLUMN "status" DROP DEFAULT`,
    );
  }
}
