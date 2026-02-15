import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class BasicQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsDateString()
  from?: string;

  @IsOptional()
  @IsDateString()
  to?: string;

  // >>> FILTER <<<
  @IsOptional()
  @Transform(({ value }) =>
    Array.isArray(value) ? value : value ? [value] : [],
  )
  @IsArray()
  @IsString({ each: true })
  filter?: string[];

  // >>> SORT <<<
  @IsOptional()
  @Transform(({ value }) =>
    Array.isArray(value) ? value : value ? [value] : [],
  )
  @IsArray()
  @IsString({ each: true })
  sort?: string[];
}
