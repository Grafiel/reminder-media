import { Injectable } from '@nestjs/common';
import { Game } from './game.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game) private gameRepository: Repository<Game>,
  ) {}

  async save(game: Game): Promise<Game> {
    return this.gameRepository.save(game);
  }

  async findByUserId(
    userId: number,
    page: number,
    limit: number,
  ): Promise<Game[]> {
    return await this.gameRepository.find({
      where: { user_id: userId },
      skip: (page - 1) * limit,
      take: limit,
      order: {
        created_at: 'DESC',
      },
    });
  }

  async findByUserIdAndGameId(userId: number, gameId: number): Promise<Game> {
    const game = await this.gameRepository.findOne({
      where: {
        user_id: userId,
        id: gameId,
      },
    });
    if (!game) {
      return new Game();
    }
    return game;
  }

  async deleteById(gameId: number) {
    await this.gameRepository.delete({ id: gameId });
  }
}