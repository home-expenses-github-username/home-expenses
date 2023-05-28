import { MigrationInterface, QueryRunner } from 'typeorm';

export class SaveVerificationCodeAsHash1685285633741 implements MigrationInterface {
  name = 'SaveVerificationCodeAsHash1685285633741';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`EXEC sp_rename "home-expenses-sqldb.dbo.user.verificationCode", "verificationCodeHash"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "verificationCodeHash"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "verificationCodeHash" nvarchar(255)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "verificationCodeHash"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "verificationCodeHash" nvarchar(255)`);
    await queryRunner.query(`EXEC sp_rename "home-expenses-sqldb.dbo.user.verificationCodeHash", "verificationCode"`);
  }
}
