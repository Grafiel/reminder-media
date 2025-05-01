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
  import { CreateMovieDTO } from './create-movie.dto';
  import { MovieService } from './movie.service';
  import { Movie } from './movie.entity';
  import { ApiParam, ApiQuery } from '@nestjs/swagger';
  
  @Controller('movie')
  export class MovieController {
    constructor(private readonly movieService: MovieService) {}
    
    @Post()
    async create(@Req() request: Request, @Body() createMovieDTO: CreateMovieDTO) {
      const movie: Movie = new Movie();
      const userJwtPayload: JwtPayloadDto = request['user'];
      movie.title = createMovieDTO.title;
      movie.director = createMovieDTO.director;
      movie.description = createMovieDTO.description;
      movie.release_year = createMovieDTO.releaseYear || 0;
      movie.poster_url = createMovieDTO.posterUrl || '';
      movie.genre = createMovieDTO.genre || '';
      movie.user_id = userJwtPayload.sub;
      await this.movieService.save(movie);
    }
  
    @Get()
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
    async findAll(
      @Req() request: Request,
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 10,
    ): Promise<Movie[]> {
      const userJwtPayload: JwtPayloadDto = request['user'];
      return await this.movieService.findByUserId(userJwtPayload.sub, page, limit);
    }
  
    @Get(':id')
    @ApiParam({ name: 'id', type: Number, description: 'ID of the movie' })
    async findOne(
      @Req() request: Request,
      @Param('id') id: number,
    ): Promise<Movie> {
      const userJwtPayload: JwtPayloadDto = request['user'];
      return await this.movieService.findByUserIdAndMovieId(userJwtPayload.sub, id);
    }
  
    @Put(':id')
    @ApiParam({ name: 'id', type: Number, description: 'ID of the movie' })
    async updateOne(
      @Req() request: Request,
      @Param('id') id: number,
      @Body() createMovieDTO: CreateMovieDTO,
    ) {
      const userJwtPayload: JwtPayloadDto = request['user'];
      const movie: Movie = await this.movieService.findByUserIdAndMovieId(
        userJwtPayload.sub,
        id,
      );
      if (movie.id == null) {
        throw new NotFoundException();
      }
      movie.title = createMovieDTO.title;
      movie.director = createMovieDTO.director;
      movie.description = createMovieDTO.description;
      movie.release_year = createMovieDTO.releaseYear || 0;
      movie.poster_url = createMovieDTO.posterUrl || '';
      movie.genre = createMovieDTO.genre || '';
      await this.movieService.save(movie);
    }
  
    @Delete(':id')
    @ApiParam({ name: 'id', type: Number, description: 'ID of the movie' })
    async deleteOne(@Req() request: Request, @Param('id') id: number) {
      const userJwtPayload: JwtPayloadDto = request['user'];
      const movie: Movie = await this.movieService.findByUserIdAndMovieId(
        userJwtPayload.sub,
        id,
      );
      if (movie.id == null) {
        throw new NotFoundException();
      }
      await this.movieService.deleteById(id);
    }
  }