import { Module } from '@nestjs/common';
import { CashflowController } from './cashflow.controller';
import { CashflowFormService } from './services/cashflow-form.service';
import { CashflowFetchService } from './services/cashflow-fetch.service';
import { CashflowSalesService } from './services/cashflow-sales.service';
import { SalesModule } from '../sales/sales.module';

@Module({
  imports:[SalesModule],
  controllers: [CashflowController],
  providers: [CashflowFormService, CashflowFetchService, CashflowSalesService],
})
export class CashflowModule {}
