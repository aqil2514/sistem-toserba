import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Roles } from '../../../decorator/roles.decorator';
import { PasetoGuard } from '../../../guards/paseto.guard';
import { RoleGuard } from '../../../guards/role.guard';
import { CashCounterCashCountingService } from '../services/cash-counter-cash-counting.service';
import { BasicQuery } from '../../../@types/general';

@UseGuards(PasetoGuard, RoleGuard)
@Roles('admin')
@Controller('cash-counter/cash-counting')
export class CashCounterCashCountingController {
  constructor(
    private readonly cashCounterCashCountingService: CashCounterCashCountingService,
  ) {}

  @Get()
  async getCashCounts(@Query() query: BasicQuery) {
    return await this.cashCounterCashCountingService.getCashCounts(query);
  }
}
