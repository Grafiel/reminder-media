import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSongsTable1745585454937 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE TABLE songs (
              id SERIAL PRIMARY KEY,
              user_id INTEGER NOT NULL,
              title VARCHAR(255) NOT NULL,
              artist VARCHAR(255) NOT NULL,
              album VARCHAR(255),
              release_year INTEGER,
              cover_art_url TEXT,
              genre VARCHAR(100),
              duration INTEGER,
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
    await queryRunner.query(`DROP TABLE songs;`)
  }
}