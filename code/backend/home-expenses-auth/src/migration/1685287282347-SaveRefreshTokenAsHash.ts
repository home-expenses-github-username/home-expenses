import { MigrationInterface, QueryRunner } from 'typeorm';

export class SaveRefreshTokenAsHash1685287282347 implements MigrationInterface {
  name = 'SaveRefreshTokenAsHash1685287282347';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`EXEC sp_rename "home-expenses-sqldb.dbo.user.refreshToken", "refreshTokenHash"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "refreshTokenHash"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "refreshTokenHash" nvarchar(255)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "refreshTokenHash"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "refreshTokenHash" nvarchar(255)`);
    await queryRunner.query(`EXEC sp_rename "home-expenses-sqldb.dbo.user.refreshTokenHash", "refreshToken"`);
  }
}
