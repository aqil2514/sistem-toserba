import { Module } from '@nestjs/common';
import { CashCounterDenominationController } from './controllers/cash-counter-denomination.controller';
import { CashCounterDenominationService } from './services/cash-counter-denomination.service';

@Module({
  controllers: [CashCounterDenominationController],
  providers:[CashCounterDenominationService]
})
export class CashCounterModule {}
