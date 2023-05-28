import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRefreshTokenToUser1685277210701 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD refreshToken nvarchar(255)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN refreshToken`);
  }
}
