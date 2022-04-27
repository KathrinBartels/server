import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  picture?: string;

  @IsString()
  @IsNotEmpty()
  trainer: string;

  @IsString()
  @IsOptional()
  description?: string;
}
