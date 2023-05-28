import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFirstName1685296046804 implements MigrationInterface {
  name = 'AddFirstName1685296046804';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "firstName" nvarchar(255)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`);
  }
}
