import {
  BadRequestException,
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PasetoGuard } from '../../../guards/paseto.guard';
import { RoleGuard } from '../../../guards/role.guard';
import { Roles } from '../../../decorator/roles.decorator';
import { SalesReportService } from '../services/sales-report.service';
import { BasicQueryDto } from '../../../services/query/dto/query.dto';
import { SalesReportDetailDto } from '../dto/sales-report-detail.dto';
import { SalesReportChartDto } from '../dto/sales-report-chart.dto';

@UseGuards(PasetoGuard, RoleGuard)
@Roles('admin')
@Controller('sales/report')
export class SalesReportController {
  constructor(private readonly reportService: SalesReportService) {}
  @Get('summary')
  async getSalesReportSummary(@Query() query: BasicQueryDto) {
    return await this.reportService.getSalesReportSummary(query);
  }

  @Get('detail')
  async getSalesReportDetail(@Query() query: SalesReportDetailDto) {
    const { mode } = query;

    if (mode === 'full')
      return await this.reportService.getSalesReportDetailFullMode(query);
    if (mode === 'product')
      return await this.reportService.getSalesReportDetailProductMode(query);

    throw new BadRequestException('Request tidak dikenali');
  }

  @Get('chart')
  async getSalesReportChart(@Query() query: SalesReportChartDto) {
    switch (query.mode) {
      case 'breakdown':
        return await this.reportService.getSalesReportChartBreakdown(query);

      default:
        break;
    }

    throw new BadRequestException('Request tidak dikenali');
  }
}
