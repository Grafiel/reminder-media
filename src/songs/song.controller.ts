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
  import { CreateSongDTO } from './create-song.dto';
  import { SongService } from './song.service';
  import { Song } from './song.entity';
  import { ApiParam, ApiQuery } from '@nestjs/swagger';
  
  @Controller('song')
  export class SongController {
    constructor(private readonly songService: SongService) {}
    
    @Post()
    async create(@Req() request: Request, @Body() createSongDTO: CreateSongDTO) {
      const song: Song = new Song();
      const userJwtPayload: JwtPayloadDto = request['user'];
      song.title = createSongDTO.title;
      song.artist = createSongDTO.artist;
      song.album = createSongDTO.album || '';
      song.release_year = createSongDTO.releaseYear || 0;
      song.cover_art_url = createSongDTO.coverArtUrl || '';
      song.genre = createSongDTO.genre || '';
      song.duration = createSongDTO.duration || 0;
      song.user_id = userJwtPayload.sub;
      await this.songService.save(song);
    }
  
    @Get()
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
    async findAll(
      @Req() request: Request,
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 10,
    ): Promise<Song[]> {
      const userJwtPayload: JwtPayloadDto = request['user'];
      return await this.songService.findByUserId(userJwtPayload.sub, page, limit);
    }
  
    @Get(':id')
    @ApiParam({ name: 'id', type: Number, description: 'ID of the song' })
    async findOne(
      @Req() request: Request,
      @Param('id') id: number,
    ): Promise<Song> {
      const userJwtPayload: JwtPayloadDto = request['user'];
      return await this.songService.findByUserIdAndSongId(userJwtPayload.sub, id);
    }
  
    @Put(':id')
    @ApiParam({ name: 'id', type: Number, description: 'ID of the song' })
    async updateOne(
      @Req() request: Request,
      @Param('id') id: number,
      @Body() createSongDTO: CreateSongDTO,
    ) {
      const userJwtPayload: JwtPayloadDto = request['user'];
      const song: Song = await this.songService.findByUserIdAndSongId(
        userJwtPayload.sub,
        id,
      );
      if (song.id == null) {
        throw new NotFoundException();
      }
      song.title = createSongDTO.title;
      song.artist = createSongDTO.artist;
      song.album = createSongDTO.album || '';
      song.release_year = createSongDTO.releaseYear || 0;
      song.cover_art_url = createSongDTO.coverArtUrl || '';
      song.genre = createSongDTO.genre || '';
      song.duration = createSongDTO.duration || 0;
      await this.songService.save(song);
    }
  
    @Delete(':id')
    @ApiParam({ name: 'id', type: Number, description: 'ID of the song' })
    async deleteOne(@Req() request: Request, @Param('id') id: number) {
      const userJwtPayload: JwtPayloadDto = request['user'];
      const song: Song = await this.songService.findByUserIdAndSongId(
        userJwtPayload.sub,
        id,
      );
      if (song.id == null) {
        throw new NotFoundException();
      }
      await this.songService.deleteById(id);
    }
  }