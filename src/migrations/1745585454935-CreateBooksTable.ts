import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBooksTable1745585454935 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE TABLE books (
              id SERIAL PRIMARY KEY,
              user_id INTEGER NOT NULL,
              title VARCHAR(255) NOT NULL,
              author VARCHAR(255) NOT NULL,
              description TEXT NOT NULL,
              publication_year INTEGER,
              cover_image_url TEXT,
              isbn VARCHAR(20),
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
    await queryRunner.query(`DROP TABLE books;`)
  }
}