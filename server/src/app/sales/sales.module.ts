import { Module } from '@nestjs/common';
import { SalesController } from './controller/sales.controller';
import { SalesService } from './sales.service';
import { SalesStockService } from './services/sales-stock.service';
import { SalesRpcService } from './services/sales-rpc.service';
import { SalesReportService } from './services/sales-report.service';
import { SalesFetcherService } from './services/sales-fetcher.service';
import { SalesLogService } from './services/sales-log.service';
import { SalesReportController } from './controller/sales-report.controller';

@Module({
  controllers: [SalesController, SalesReportController],
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
