import { IsIn, IsInt, IsOptional, Min } from 'class-validator';
import { BasicQueryDto } from '../../../services/query/dto/query.dto';
import { Type } from 'class-transformer';

export class SalesReportChartDto extends BasicQueryDto {
  @IsOptional()
  @IsIn(['breakdown', 'per-category', 'per-product'])
  mode?: 'breakdown' | 'per-category' | 'per-product' = 'breakdown';

  @IsOptional()
  @IsIn(['day', 'week', 'month', 'year'])
  groupBy?: 'day' | 'week' | 'month' | 'year';

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  top?: number;
}
