import { Module } from '@nestjs/common';
import { CashflowController } from './controller/cashflow.controller';
import { CashflowFormService } from './services/cashflow-form.service';
import { CashflowFetchService } from './services/cashflow-fetch.service';
import { CashflowSalesService } from './services/cashflow-sales.service';
import { SalesModule } from '../sales/sales.module';
import { CashflowPRService } from './services/cashflow-pr.service';
import { CashflowReportService } from './services/cashflow-report.service';
import { CashflowResourcesService } from './services/cashflow-resources.service';
import { CashflowCashCounterService } from './services/cashflow-cash-counter.service';
import { CashCounterModule } from '../cash-counter/cash-counter.module';
import { CashflowWebhookController } from './controller/cashflow-webhook.controller';
import { CashflowPayableReceivableController } from './controller/cashflow-payable-receivable.controller';
import { CashflowReportController } from './controller/cashflow-report.controller';

@Module({
  imports: [SalesModule, CashCounterModule],
  controllers: [
    CashflowPayableReceivableController,
    CashflowWebhookController,
    CashflowReportController,
    CashflowController,
  ],
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
