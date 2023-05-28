import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPendingRecoverColumn1685314216174 implements MigrationInterface {
  name = 'AddPendingRecoverColumn1685314216174';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "pendingRecover" bit NOT NULL CONSTRAINT "DF_c18ce7b6fb086da2dcbeca2452f" DEFAULT 0`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "DF_c18ce7b6fb086da2dcbeca2452f"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "pendingRecover"`);
  }
}
