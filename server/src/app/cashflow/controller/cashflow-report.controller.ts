import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Roles } from '../../../decorator/roles.decorator';
import { PasetoGuard } from '../../../guards/paseto.guard';
import { RoleGuard } from '../../../guards/role.guard';
import { CashflowReportService } from '../services/cashflow-report.service';
import { CashflowReportDto } from '../dto/cashflow-report-query.dto';

@UseGuards(PasetoGuard, RoleGuard)
@Roles('admin')
@Controller('cashflow/report')
export class CashflowReportController {
  constructor(private readonly service: CashflowReportService) {}

  @Get('summary')
  async getCashflowReportSummary(@Query() query: CashflowReportDto) {
    return await this.service.getCashflowSummary(query);
  }

  @Get('breakdown')
  async getCashflowReportBreakdown(@Query() query: CashflowReportDto) {
    return await this.service.getCashflowBreakdown(query);
  }

  @Get('movement')
  async getCashflowReportMovement(@Query() query: CashflowReportDto) {
    switch (query.mode) {
      case 'movement-asset':
        return await this.service.getCashflowMovementWithAsset(query);

      default:
        return await this.service.getCashflowMovement(query);
    }
  }

  @Get('allocation')
  async getCashflowReportAllocation(@Query() query: CashflowReportDto) {
    return await this.service.getCashflowAllocation(query);
  }
}
