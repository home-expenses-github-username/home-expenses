/*
 * Author: Vladimir Vysokomornyi
 */

import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDateAsBigInt1687130518830 implements MigrationInterface {
  name = 'AddDateAsBigInt1687130518830';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "expense_v2" DROP COLUMN "date"`);
    await queryRunner.query(`ALTER TABLE "expense_v2" ADD "date" bigint NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "expense_v2" DROP COLUMN "date"`);
    await queryRunner.query(`ALTER TABLE "expense_v2" ADD "date" int NOT NULL`);
  }
}
