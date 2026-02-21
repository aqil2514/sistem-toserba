import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { WebhookGuard } from '../../../guards/webhook.guard';
import { CashflowFormService } from '../services/cashflow-form.service';
import { CashflowWebhookDto } from '../dto/cashflow-webhook.dto';
import { CashflowDto } from '../dto/cashflow.dto';

@UseGuards(WebhookGuard)
@Controller('cashflow/webhook')
export class CashflowWebhookController {
  constructor(private readonly cashflowFormService: CashflowFormService) {}

  @Post()
  async handleWebhook(@Body() webhookPayload: CashflowWebhookDto) {
    const payload: CashflowDto = {
      ...webhookPayload,
      transaction_at: new Date().toISOString(),
    };
    return await this.cashflowFormService.createNewCashflowData(payload);
  }
}
