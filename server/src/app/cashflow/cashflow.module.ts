import { Module } from '@nestjs/common';
import { CashflowController } from './cashflow.controller';
import { CashflowFormService } from './services/cashflow-form.service';
import { CashflowFetchService } from './services/cashflow-fetch.service';
import { CashflowSalesService } from './services/cashflow-sales.service';
import { SalesModule } from '../sales/sales.module';
import { CashflowWebhookController } from './cashflow-webhook.controller';
import { CashflowPRService } from './services/cashflow-pr.service';
import { CashflowReportService } from './services/cashflow-report.service';
import { CashflowResourcesService } from './services/cashflow-resources.service';
import { CashflowCashCounterService } from './services/cashflow-cash-counter.service';
import { CashCounterModule } from '../cash-counter/cash-counter.module';

@Module({
  imports: [SalesModule, CashCounterModule],
  controllers: [CashflowController, CashflowWebhookController],
  providers: [
    CashflowFormService,
    CashflowFetchService,
    CashflowSalesService,
    CashflowPRService,
    CashflowReportService,
    CashflowResourcesService,
    CashflowCashCounterService,
  ],
})
export class CashflowModule {}
