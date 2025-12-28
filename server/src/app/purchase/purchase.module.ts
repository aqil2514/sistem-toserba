import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { ProductsModule } from '../products/products.module';
import { ProductsService } from '../products/products.service';

@Module({
  imports: [ProductsModule],
  providers: [PurchaseService, ProductsService],
  controllers: [PurchaseController],
})
export class PurchaseModule {}
