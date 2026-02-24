import { Module } from '@nestjs/common';
import { PurchaseController } from './controller/purchase.controller';
import { ProductsModule } from '../products/products.module';
import { PurchaseFormService } from './services/purchase-form.service';
import { PurchaseReportService } from './services/purchase-report.service';
import { PurchaseService } from './services/purchase.service';
import { PurchaseFetcherController } from './controller/purchase-fetcher.controller';
import { PurchaseFetcherService } from './services/purchase-fetcher.service';
import { PurchaseMapperService } from './services/helper/purchase-mapper.service';
import { PurchaseActivityService } from './services/purchase-activity.service';
import { PurchaseGetterService } from './services/helper/purchase-getter.service';
import { PurchaseUpdateService } from './services/helper/purchase-updater.service';

@Module({
  imports: [ProductsModule],
  providers: [
    PurchaseService,
    PurchaseFormService,
    PurchaseReportService,
    PurchaseFetcherService,
    PurchaseMapperService,
    PurchaseActivityService,
    PurchaseGetterService,
    PurchaseUpdateService
  ],
  controllers: [PurchaseController, PurchaseFetcherController],
})
export class PurchaseModule {}
