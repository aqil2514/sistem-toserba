import { Module } from '@nestjs/common';
import { AssetFinancialController } from './asset-financial.controller';
import { AssetFinancialFetchService } from './services/asset-financial-fetch.service';

@Module({
  providers: [AssetFinancialFetchService],
  controllers: [AssetFinancialController],
})
export class AssetFinancialModule {}
