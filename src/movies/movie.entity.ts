import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('movies')
  export class Movie {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    user_id: number;
  
    @Column()
    title: string;
  
    @Column()
    director: string;
  
    @Column()
    description: string;
  
    @Column({ nullable: true })
    release_year: number;
  
    @Column({ nullable: true })
    poster_url: string;
  
    @Column({ nullable: true })
    genre: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }