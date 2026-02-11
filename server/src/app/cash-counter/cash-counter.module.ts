import { Module } from '@nestjs/common';
import { CashCounterDenominationController } from './controllers/cash-counter-denomination.controller';
import { CashCounterDenominationService } from './services/cash-counter-denomination.service';
import { CashCounterCashCountingController } from './controllers/cash-counter-cash-counting.controller';
import { CashCounterCashCountingService } from './services/cash-counter-cash-counting.service';
import { CashCounterCashCountingFetchService } from './services/cash-counter-cash-counting-fetch.service';

@Module({
  controllers: [
    CashCounterDenominationController,
    CashCounterCashCountingController,
  ],
  providers: [
    CashCounterDenominationService,
    CashCounterCashCountingService,
    CashCounterCashCountingFetchService,
  ],
})
export class CashCounterModule {}
