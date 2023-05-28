import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLastName1685295929768 implements MigrationInterface {
  name = 'AddLastName1685295929768';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "lastName" nvarchar(255)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`);
  }
}
