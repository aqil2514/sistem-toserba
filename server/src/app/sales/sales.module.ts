import { Module } from '@nestjs/common';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { SalesStockService } from './services/sales-stock.service';
import { SalesRpcService } from './services/sales-rpc.service';
import { SalesReportService } from './services/sales-report.service';
import { SalesFetcherService } from './services/sales-fetcher.service';
import { SalesLogService } from './services/sales-log.service';

@Module({
  controllers: [SalesController],
  providers: [
    SalesService,
    SalesStockService,
    SalesRpcService,
    SalesReportService,
    SalesFetcherService,
    SalesLogService,
  ],
  exports: [SalesReportService],
})
export class SalesModule {}
