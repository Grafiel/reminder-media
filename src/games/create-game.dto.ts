import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsOptional, IsNumber } from "class-validator";

export class CreateGameDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  developer: string;

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
  coverImageUrl?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  genre?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  platform?: string;
}