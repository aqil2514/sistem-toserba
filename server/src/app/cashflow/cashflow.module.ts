import { Module } from '@nestjs/common';
import { CashflowController } from './cashflow.controller';
import { CashflowFormService } from './services/cashflow-form.service';
import { CashflowFetchService } from './services/cashflow-fetch.service';
import { CashflowSalesService } from './services/cashflow-sales.service';
import { SalesModule } from '../sales/sales.module';
import { CashflowWebhookController } from './cashflow-webhook.controller';

@Module({
  imports:[SalesModule],
  controllers: [CashflowController, CashflowWebhookController],
  providers: [CashflowFormService, CashflowFetchService, CashflowSalesService],
})
export class CashflowModule {}
