import { Module } from '@nestjs/common';
import { CashflowController } from './cashflow.controller';
import { CashflowFormService } from './services/cashflow-form.service';
import { CashflowFetchService } from './services/cashflow-fetch.service';

@Module({
  controllers: [CashflowController],
  providers:[CashflowFormService, CashflowFetchService]
})
export class CashflowModule {}
