import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('songs')
  export class Song {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    user_id: number;
  
    @Column()
    title: string;
  
    @Column()
    artist: string;
  
    @Column({ nullable: true })
    album: string;
  
    @Column({ nullable: true })
    release_year: number;
  
    @Column({ nullable: true })
    cover_art_url: string;
  
    @Column({ nullable: true })
    genre: string;
  
    @Column({ nullable: true })
    duration: number;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }