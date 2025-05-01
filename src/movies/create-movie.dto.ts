import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsOptional, IsNumber } from "class-validator";

export class CreateMovieDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  director: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  releaseYear?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  posterUrl?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  genre?: string;
}