import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CashflowPRService } from '../services/cashflow-pr.service';
import { CashflowPRDto } from '../dto/cashflow-pr.dto';
import { Roles } from '../../../decorator/roles.decorator';
import { PasetoGuard } from '../../../guards/paseto.guard';
import { RoleGuard } from '../../../guards/role.guard';

@UseGuards(PasetoGuard, RoleGuard)
@Roles('admin')
@Controller('cashflow/payable-receivable')
export class CashflowPayableReceivableController {
  constructor(private readonly service: CashflowPRService) {}

  @Get()
  async getCashflowPayableReceivable() {
    return await this.service.getPayableReceivable();
  }

  @Get('detail')
  async getCashflowDetail(@Query() query: CashflowPRDto) {
    switch (query.type) {
      case 'payable':
        return await this.service.getPayableDetail(query.counterpart_name);
      default:
        return await this.service.getReceivableDetail(query.counterpart_name);
    }
  }
}
