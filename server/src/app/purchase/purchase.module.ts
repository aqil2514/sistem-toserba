import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { ProductsModule } from '../products/products.module';
import { PurchaseFormService } from './helpers/purchase-form.service';
import { PurchaseReportService } from './helpers/purchase-report.service';

@Module({
  imports: [ProductsModule],
  providers: [PurchaseService, PurchaseFormService, PurchaseReportService],
  controllers: [PurchaseController],
})
export class PurchaseModule {}
