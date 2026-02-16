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
import { SalesService } from './sales.service';
import { SalesQuery } from './interface/sales-query.interface';
import { PasetoGuard } from '../../guards/paseto.guard';
import { RoleGuard } from '../../guards/role.guard';
import { Roles } from '../../decorator/roles.decorator';
import { CreateSalesDto } from './dto/create-sales.dto';
import { GetSummaryQuery } from './interface/sales-rpc.interface';
import { SalesRpcService } from './services/sales-rpc.service';
import { SalesReportQuery } from './interface/sales-report.interface';
import { SalesReportService } from './services/sales-report.service';
import { SalesFetcherService } from './services/sales-fetcher.service';

@UseGuards(PasetoGuard, RoleGuard)
@Roles('admin')
@Controller('sales')
export class SalesController {
  constructor(
    private readonly salesService: SalesService,
    private readonly salesRpcService: SalesRpcService,
    private readonly salesReportService: SalesReportService,
    private readonly salesFetcherService: SalesFetcherService,
  ) {}

  @Get()
  async getTransaction(@Query() query: SalesQuery) {
    return await this.salesFetcherService.findByQuery(query);
  }

  @Get('report')
  async getSalesReport(@Query() query: SalesReportQuery) {
    if (query.content === 'summary')
      return await this.salesReportService.getSalesSummaryContent(query);
    if (query.content === 'chart') {
      if (query.mode === 'breakdown-omzet')
        return await this.salesReportService.getSalesBreakdown(query);
      if (query.mode === 'report-per-category')
        return await this.salesReportService.getSalesReportPerCategory(query);
    }

    if (query.content === 'detail') {
      if (query.mode === 'summary-product')
        return await this.salesReportService.getSalesReportProductSummary(
          query,
        );

      return await this.salesReportService.getSalesReport(query);
    }
  }

  @Get('summary')
  async getSummarySales(@Query() query: GetSummaryQuery) {
    const { endDate, startDate, timezone } = query;
    return await this.salesRpcService.getSalesSummaryByRange(
      startDate,
      endDate,
      timezone,
    );
  }

  @Get('customer_name')
  async getCustomerName() {
    return await this.salesFetcherService.getCustomerName();
  }

  @Get(':sales_id')
  async getTransactionBySalesId(@Param('sales_id') sales_id: string) {
    return await this.salesFetcherService.findItemBySalesId(sales_id);
  }

  @Post()
  async createNewTransaction(@Body() body: CreateSalesDto) {
    return await this.salesService.createNewTransaction(body);
  }

  @Put(':sales_id')
  async editTransaction(
    @Body() body: CreateSalesDto,
    @Param('sales_id') sales_id: string,
  ) {
    return await this.salesService.updateTransaction(sales_id, body);
  }

  @Delete(':sales_id')
  async deleteTransaction(@Param('sales_id') sales_id: string) {
    return await this.salesService.deleteTransaction(sales_id);
  }
}
