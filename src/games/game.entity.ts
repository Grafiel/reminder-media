import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('games')
  export class Game {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    user_id: number;
  
    @Column()
    title: string;
  
    @Column()
    developer: string;
  
    @Column()
    description: string;
  
    @Column({ nullable: true })
    release_year: number;
  
    @Column({ nullable: true })
    cover_image_url: string;
  
    @Column({ nullable: true })
    genre: string;
  
    @Column({ nullable: true })
    platform: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }