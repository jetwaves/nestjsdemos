import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1697146851476 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS game;`);
    await queryRunner.query(`DROP TABLE IF EXISTS game_run;`);
    await queryRunner.query(`
      CREATE TABLE "game" (
        "id" SERIAL PRIMARY KEY,
        "tries_count" INTEGER NOT NULL DEFAULT '0',
        "latest_feedback" CHAR(4) NULL DEFAULT NULL,
        "ref" INTEGER NULL DEFAULT NULL
      )
    `);
    await queryRunner.query(
      `
      CREATE TABLE "game_run" (
        "id" SERIAL PRIMARY KEY,
        "created_at" TIMESTAMPTZ NOT NULL,
        "game_ref" INTEGER NOT NULL,
        "proposal" INTEGER NOT NULL,
        "feedback" CHAR(4) NOT NULL
      )
      `,
    );
    await queryRunner.query(
      `
      CREATE INDEX idx_ref ON "game" ("ref");
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS game;`);
    await queryRunner.query(`DROP TABLE IF EXISTS game_run;`);
  }
}
