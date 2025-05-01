import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMoviesTable1745585454936 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE TABLE movies (
              id SERIAL PRIMARY KEY,
              user_id INTEGER NOT NULL,
              title VARCHAR(255) NOT NULL,
              director VARCHAR(255) NOT NULL,
              description TEXT NOT NULL,
              release_year INTEGER,
              poster_url TEXT,
              genre VARCHAR(100),
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
    await queryRunner.query(`DROP TABLE movies;`)
  }
}