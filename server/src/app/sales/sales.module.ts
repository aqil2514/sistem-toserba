import { Module } from '@nestjs/common';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { SalesStockService } from './helper/sales-stock.service';

@Module({
  controllers: [SalesController],
  providers: [SalesService, SalesStockService],
})
export class SalesModule {}
