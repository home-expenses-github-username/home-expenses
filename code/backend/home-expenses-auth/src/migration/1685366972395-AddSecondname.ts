import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSecondname1685366972395 implements MigrationInterface {
  name = 'AddSecondname1685366972395';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "secondName" nvarchar(255)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "secondName"`);
  }
}
