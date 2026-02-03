import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { Roles } from '../../decorator/roles.decorator';
import { PasetoGuard } from '../../guards/paseto.guard';
import { RoleGuard } from '../../guards/role.guard';
import { CashflowDto } from './dto/cashflow.dto';
import { CashflowFormService } from './services/cashflow-form.service';
import { CashflowFetchService } from './services/cashflow-fetch.service';
import { BasicQuery } from '../../@types/general';

@Controller('cashflow')
export class CashflowController {
  constructor(
    private readonly cashflowFormService: CashflowFormService,
    private readonly cashflowFetchService: CashflowFetchService,
  ) {}

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Post()
  async createNewCashflow(@Body() body: CashflowDto) {
    return await this.cashflowFormService.createNewCashflowData(body);
  }

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Get()
  async getCashflowsData(@Query() query: BasicQuery) {
    return await this.cashflowFetchService.getCashflowsData(query);
  }

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Get('categories')
  async getCashflowCategories() {
    return await this.cashflowFetchService.getAllCashflowCategory();
  }
}
