import { Module } from '@nestjs/common';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { SalesStockService } from './helper/sales-stock.service';
import { SalesRpcService } from './helper/sales-rpc.service';

@Module({
  controllers: [SalesController],
  providers: [SalesService, SalesStockService, SalesRpcService],
})
export class SalesModule {}
