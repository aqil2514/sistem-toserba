import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductFetchService } from './helpers/products-fetch.service';
import { ProductStockService } from './helpers/products-stock.service';

@Module({
  providers: [ProductsService, ProductFetchService, ProductStockService],
  controllers: [ProductsController],
  exports: [ProductFetchService],
})
export class ProductsModule {}
