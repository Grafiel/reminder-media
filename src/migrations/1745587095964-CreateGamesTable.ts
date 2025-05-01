import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGamesTable1745585454938 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE TABLE games (
              id SERIAL PRIMARY KEY,
              user_id INTEGER NOT NULL,
              title VARCHAR(255) NOT NULL,
              developer VARCHAR(255) NOT NULL,
              description TEXT NOT NULL,
              release_year INTEGER,
              cover_image_url TEXT,
              genre VARCHAR(100),
              platform VARCHAR(100),
              created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,

              CONSTRAINT fk_user
                  FOREIGN KEY(user_id) 
                  REFERENCES Users(id)
                  ON DELETE CASCADE
          );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE games;`)
  }
}