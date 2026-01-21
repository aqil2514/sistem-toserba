import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { ProductsModule } from '../products/products.module';
import { PurchaseFormService } from './helpers/purchase-form.service';

@Module({
  imports: [ProductsModule],
  providers: [PurchaseService,PurchaseFormService],
  controllers: [PurchaseController],
})
export class PurchaseModule {}
