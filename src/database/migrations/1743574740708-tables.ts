import { MigrationInterface, QueryRunner } from 'typeorm';

export class Tables1743574740708 implements MigrationInterface {
  name = 'Tables1743574740708';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "money_stat"."users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "full_name" character varying(255) NOT NULL, "username" character varying(50) NOT NULL, "password" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'active', "role" character varying NOT NULL DEFAULT 'user', "is_admin" boolean NOT NULL DEFAULT false, "email" character varying NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "money_stat"."payments_types" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_28d1155b29218ef361242204893" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "money_stat"."costs" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "amount" numeric NOT NULL, "desc" character varying(500) NOT NULL, "currency_name" character varying NOT NULL DEFAULT 'UZS', "user_id" integer, "payments_type_id" integer, CONSTRAINT "REL_3042dee38c8dc07b2e503c9ad4" UNIQUE ("payments_type_id"), CONSTRAINT "PK_05cc8aa05396a72553cdff6d5be" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "money_stat"."costs" ADD CONSTRAINT "FK_a707735f78c9f6852690ea66e34" FOREIGN KEY ("user_id") REFERENCES "money_stat"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "money_stat"."costs" ADD CONSTRAINT "FK_3042dee38c8dc07b2e503c9ad4f" FOREIGN KEY ("payments_type_id") REFERENCES "money_stat"."payments_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "money_stat"."costs" DROP CONSTRAINT "FK_3042dee38c8dc07b2e503c9ad4f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "money_stat"."costs" DROP CONSTRAINT "FK_a707735f78c9f6852690ea66e34"`,
    );
    await queryRunner.query(`DROP TABLE "money_stat"."costs"`);
    await queryRunner.query(`DROP TABLE "money_stat"."payments_types"`);
    await queryRunner.query(`DROP TABLE "money_stat"."users"`);
  }
}
