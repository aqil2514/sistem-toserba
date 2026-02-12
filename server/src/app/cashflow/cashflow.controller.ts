import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../../decorator/roles.decorator';
import { PasetoGuard } from '../../guards/paseto.guard';
import { RoleGuard } from '../../guards/role.guard';
import { CashflowDto } from './dto/cashflow.dto';
import { CashflowFormService } from './services/cashflow-form.service';
import { CashflowFetchService } from './services/cashflow-fetch.service';
import { BasicQuery } from '../../@types/general';
import { CashflowSalesService } from './services/cashflow-sales.service';
import { CashflowPRService } from './services/cashflow-pr.service';
import { CashflowReportService } from './services/cashflow-report.service';
import { CashflowReportQuery } from './types/cashflow-report.types';
import { CashflowResourcesService } from './services/cashflow-resources.service';
import { CashflowCashCounterService } from './services/cashflow-cash-counter.service';

@UseGuards(PasetoGuard, RoleGuard)
@Roles('admin')
@Controller('cashflow')
export class CashflowController {
  constructor(
    private readonly cashflowFormService: CashflowFormService,
    private readonly cashflowFetchService: CashflowFetchService,
    private readonly cashflowSalesService: CashflowSalesService,
    private readonly cashflowPRService: CashflowPRService,
    private readonly cashflowReportService: CashflowReportService,
    private readonly cashflowResourcesService: CashflowResourcesService,
    private readonly cashflowCashCounterService: CashflowCashCounterService,
  ) {}

  @Post()
  async createNewCashflow(@Body() body: CashflowDto) {
    return await this.cashflowFormService.createNewCashflowData(body);
  }

  @Post('sales')
  async createNewCashflowFromSales() {
    return await this.cashflowSalesService.createNewCashflowFromSales();
  }

  @Post('cash-counter')
  async createNewCashflowFromCashCounter(@Body() body:{id:string}) {
    return await this.cashflowCashCounterService.createNewData(body);
  }

  @Get()
  async getCashflowsData(@Query() query: CashflowReportQuery) {
    return await this.cashflowFetchService.getCashflowsData(query);
  }

  @Get('categories')
  async getCashflowCategories() {
    return await this.cashflowFetchService.getAllCashflowCategory();
  }

  @Get('assets')
  async getCashflowAset() {
    return await this.cashflowFetchService.getAllCashflowAsset();
  }

  @Get('payable-receivable')
  async getCashflowPayableReceivable() {
    return await this.cashflowPRService.getPayableReceivable();
  }

  @Get('report')
  async getCashflowReport(@Query() query: CashflowReportQuery) {
    if (query.content === 'summary')
      return await this.cashflowReportService.getCashflowSummary(query);
    return await this.cashflowReportService.getCashflowBreakdown(query);
  }

  @Get('vendor_name')
  async getVendorName() {
    return await this.cashflowResourcesService.getVendorName();
  }

  @Get(':id')
  async getCashflowDataById(@Param('id') cashflowId: string) {
    return await this.cashflowFetchService.getCashflowDataById(cashflowId);
  }

  @Put(':id/edit')
  async editCashflow(
    @Body() body: CashflowDto,
    @Param('id') cashflowId: string,
    @Query('transfer_group_id') transferGroupId: string,
  ) {
    return await this.cashflowFormService.editCashflowData(
      body,
      cashflowId,
      transferGroupId,
    );
  }

  @Delete(':id')
  async deleteCashflowData(
    @Param('id') cashflowId: string,
    @Query('transfer_group_id') transferGroupId: string,
  ) {
    return await this.cashflowFormService.hardDeleteCashflowData(
      cashflowId,
      transferGroupId,
    );
  }
}
