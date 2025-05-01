import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsOptional, IsNumber } from "class-validator";

export class CreateSongDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  artist: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  album?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  releaseYear?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  coverArtUrl?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  genre?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  duration?: number;
}