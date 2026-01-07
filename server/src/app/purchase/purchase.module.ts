import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { ProductsModule } from '../products/products.module';
import { ProductsService } from '../products/products.service';
import { PurchaseFormService } from './helpers/purchase-form.service';

@Module({
  imports: [ProductsModule],
  providers: [PurchaseService, ProductsService, PurchaseFormService],
  controllers: [PurchaseController],
})
export class PurchaseModule {}
