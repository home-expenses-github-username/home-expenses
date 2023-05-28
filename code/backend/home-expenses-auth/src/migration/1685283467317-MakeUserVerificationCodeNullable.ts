import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeUserVerificationCodeNullable1685283467317 implements MigrationInterface {
  name = 'MakeUserVerificationCodeNullable1685283467317';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "verificationCode" nvarchar(255)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "verificationCode" nvarchar(255) NOT NULL`);
  }
}
