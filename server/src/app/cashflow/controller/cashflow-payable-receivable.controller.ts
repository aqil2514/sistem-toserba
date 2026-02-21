import { Controller, Get, Query } from '@nestjs/common';
import { CashflowPRService } from '../services/cashflow-pr.service';
import { CashflowPRDto } from '../dto/cashflow-pr.dto';

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
