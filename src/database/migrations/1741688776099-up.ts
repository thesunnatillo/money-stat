import { MigrationInterface, QueryRunner } from 'typeorm';

export class Up1741688776099 implements MigrationInterface {
  name = 'Up1741688776099';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payments" RENAME COLUMN "currency_type_id" TO "currency_name"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payments" RENAME COLUMN "currency_name" TO "currency_type_id"`,
    );
  }
}
