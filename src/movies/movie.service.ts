import { Injectable } from '@nestjs/common';
import { Movie } from './movie.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
  ) {}

  async save(movie: Movie): Promise<Movie> {
    return this.movieRepository.save(movie);
  }

  async findByUserId(
    userId: number,
    page: number,
    limit: number,
  ): Promise<Movie[]> {
    return await this.movieRepository.find({
      where: { user_id: userId },
      skip: (page - 1) * limit,
      take: limit,
      order: {
        created_at: 'DESC',
      },
    });
  }

  async findByUserIdAndMovieId(userId: number, movieId: number): Promise<Movie> {
    const movie = await this.movieRepository.findOne({
      where: {
        user_id: userId,
        id: movieId,
      },
    });
    if (!movie) {
      return new Movie();
    }
    return movie;
  }

  async deleteById(movieId: number) {
    await this.movieRepository.delete({ id: movieId });
  }
}