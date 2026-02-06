import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { WebhookGuard } from '../../guards/webhook.guard';
import { CashflowFormService } from './services/cashflow-form.service';
import { CashflowDto } from './dto/cashflow.dto';

@UseGuards(WebhookGuard)
@Controller('cashflow/webhook')
export class CashflowWebhookController {
  constructor(private readonly cashflowFormService: CashflowFormService) {}

  @Post()
  async handleWebhook(@Body() payload: CashflowDto) {
    return await this.cashflowFormService.createNewCashflowData(payload);
  }
}
