import { IsEnum, IsOptional } from 'class-validator';
import { BasicQueryDto } from '../../../services/query/dto/query.dto';
import { Transform } from 'class-transformer';

enum MOVEMENT_MODE {
  GLOBAL = 'movement-global',
  ASSET = 'movement-asset',
}

export class CashflowReportDto extends BasicQueryDto {
  @IsOptional()
  @IsEnum(MOVEMENT_MODE)
  @Transform(({ value }) => value.toLowerCase())
  mode?: 'movement-global' | 'movement-asset';
}
