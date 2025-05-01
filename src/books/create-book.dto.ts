import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsOptional, IsNumber } from "class-validator";

export class CreateBookDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  author: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  publicationYear?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  coverImageUrl?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  isbn?: string;
}