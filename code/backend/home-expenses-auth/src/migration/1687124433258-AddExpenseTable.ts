/*
 * Author: Vladimir Vysokomornyi
 */

import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddExpenseTable1687124433258 implements MigrationInterface {
  name = 'AddExpenseTable1687124433258';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "expense_v2" ("id" int NOT NULL IDENTITY(1,1), "category" nvarchar(255) NOT NULL, "cost" int NOT NULL, "comment" nvarchar(255), "date" int NOT NULL, CONSTRAINT "PK_f10eb59cc7374db25014aef5ab0" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "expense_v2"`);
  }
}
