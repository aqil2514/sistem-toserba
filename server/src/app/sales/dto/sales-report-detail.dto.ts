import { IsIn, IsOptional } from 'class-validator';
import { BasicQueryDto } from '../../../services/query/dto/query.dto';

export class SalesReportDetailDto extends BasicQueryDto {
  @IsOptional()
  @IsIn(['full', 'product'])
  mode?: 'full' | 'product';
}
