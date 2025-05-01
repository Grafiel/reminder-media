import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
    Query,
    Req,
  } from '@nestjs/common';
  import { JwtPayloadDto } from 'src/auth/dto/jwt-payload.dto';
  import { CreateGameDTO } from './create-game.dto';
  import { GameService } from './game.service';
  import { Game } from './game.entity';
  import { ApiParam, ApiQuery } from '@nestjs/swagger';
  
  @Controller('game')
  export class GameController {
    constructor(private readonly gameService: GameService) {}
    
    @Post()
    async create(@Req() request: Request, @Body() createGameDTO: CreateGameDTO) {
      const game: Game = new Game();
      const userJwtPayload: JwtPayloadDto = request['user'];
      game.title = createGameDTO.title;
      game.developer = createGameDTO.developer;
      game.description = createGameDTO.description;
      game.release_year = createGameDTO.releaseYear || 0;
      game.cover_image_url = createGameDTO.coverImageUrl || '';
      game.genre = createGameDTO.genre || '';
      game.platform = createGameDTO.platform || '';
      game.user_id = userJwtPayload.sub;
      await this.gameService.save(game);
    }
  
    @Get()
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
    async findAll(
      @Req() request: Request,
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 10,
    ): Promise<Game[]> {
      const userJwtPayload: JwtPayloadDto = request['user'];
      return await this.gameService.findByUserId(userJwtPayload.sub, page, limit);
    }
  
    @Get(':id')
    @ApiParam({ name: 'id', type: Number, description: 'ID of the game' })
    async findOne(
      @Req() request: Request,
      @Param('id') id: number,
    ): Promise<Game> {
      const userJwtPayload: JwtPayloadDto = request['user'];
      return await this.gameService.findByUserIdAndGameId(userJwtPayload.sub, id);
    }
  
    @Put(':id')
    @ApiParam({ name: 'id', type: Number, description: 'ID of the game' })
    async updateOne(
      @Req() request: Request,
      @Param('id') id: number,
      @Body() createGameDTO: CreateGameDTO,
    ) {
      const userJwtPayload: JwtPayloadDto = request['user'];
      const game: Game = await this.gameService.findByUserIdAndGameId(
        userJwtPayload.sub,
        id,
      );
      if (game.id == null) {
        throw new NotFoundException();
      }
      game.title = createGameDTO.title;
      game.developer = createGameDTO.developer;
      game.description = createGameDTO.description;
      game.release_year = createGameDTO.releaseYear || 0;
      game.cover_image_url = createGameDTO.coverImageUrl || '';
      game.genre = createGameDTO.genre || '';
      game.platform = createGameDTO.platform || '';
      await this.gameService.save(game);
    }
  
    @Delete(':id')
    @ApiParam({ name: 'id', type: Number, description: 'ID of the game' })
    async deleteOne(@Req() request: Request, @Param('id') id: number) {
      const userJwtPayload: JwtPayloadDto = request['user'];
      const game: Game = await this.gameService.findByUserIdAndGameId(
        userJwtPayload.sub,
        id,
      );
      if (game.id == null) {
        throw new NotFoundException();
      }
      await this.gameService.deleteById(id);
    }
  }