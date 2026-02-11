import { Module } from '@nestjs/common';
import { CashCounterDenominationController } from './controllers/cash-counter-denomination.controller';
import { CashCounterDenominationService } from './services/cash-counter-denomination.service';
import { CashCounterCashCountingController } from './controllers/cash-counter-cash-counting.controller';
import { CashCounterCashCountingService } from './services/cash-counter-cash-counting.service';

@Module({
  controllers: [
    CashCounterDenominationController,
    CashCounterCashCountingController,
  ],
  providers: [CashCounterDenominationService, CashCounterCashCountingService],
})
export class CashCounterModule {}
