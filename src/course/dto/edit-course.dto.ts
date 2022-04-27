import {
  IsOptional,
  IsString,
} from 'class-validator';

export class EditCourseDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  picture?: string;

  @IsString()
  @IsOptional()
  trainer?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
