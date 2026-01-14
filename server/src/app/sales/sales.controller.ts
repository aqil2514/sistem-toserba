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
import { SalesRpcService } from './helper/sales-rpc.service';
import { SalesReportQuery } from './interface/sales-report.interface';
import { SalesReportService } from './helper/sales-report.service';

@Controller('sales')
export class SalesController {
  constructor(
    private readonly salesService: SalesService,
    private readonly salesRpcService: SalesRpcService,
    private readonly salesReportService: SalesReportService,
  ) {}

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Get()
  async getTransaction(@Query() query: SalesQuery) {
    return await this.salesService.findByQuery(query);
  }

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Get('report')
  async getSalesReport(@Query() query: SalesReportQuery) {
    if (query.content === 'summary')
      return await this.salesReportService.getSalesSummaryContent(query);
    if (query.mode === 'summary-product')
      return await this.salesReportService.getSalesReportProductSummary(query);

    return await this.salesReportService.getSalesReport(query);
  }

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Get('summary')
  async getSummarySales(@Query() query: GetSummaryQuery) {
    const { endDate, startDate, timezone } = query;
    return await this.salesRpcService.getSalesSummaryByRange(
      startDate,
      endDate,
      timezone,
    );
  }

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Get(':sales_id')
  async getTransactionBySalesId(@Param('sales_id') sales_id: string) {
    return await this.salesService.findItemBySalesId(sales_id);
  }

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Post()
  async createNewTransaction(@Body() body: CreateSalesDto) {
    return await this.salesService.createNewTransaction(body);
  }

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Put(':sales_id')
  async editTransaction(
    @Body() body: CreateSalesDto,
    @Param('sales_id') sales_id: string,
  ) {
    return await this.salesService.updateTransaction(sales_id, body);
  }

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Delete(':sales_id')
  async deleteTransaction(@Param('sales_id') sales_id: string) {
    return await this.salesService.deleteTransaction(sales_id);
  }
}
