import { IsIn, IsOptional } from 'class-validator';
import { BasicQueryDto } from '../../../services/query/dto/query.dto';

export class SalesReportChartDto extends BasicQueryDto {
  @IsOptional()
  @IsIn(['breakdown', 'per-category'])
  mode?: 'breakdown' | 'per-category' = 'breakdown';

  @IsOptional()
  @IsIn(['day', 'week', 'month', 'year'])
  groupBy?: 'day' | 'week' | 'month' | 'year';
}
