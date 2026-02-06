import { Controller, Get, UseGuards } from '@nestjs/common';
import { WebhookGuard } from '../../guards/webhook.guard';
import { CashflowFormService } from './services/cashflow-form.service';
import { CashflowDto } from './dto/cashflow.dto';

@UseGuards(WebhookGuard)
@Controller('cashflow/webhook')
export class CashflowWebhookController {
  constructor(private readonly cashflowFormService: CashflowFormService) {}

  @Get('transfer-to-rdn')
  async createNewTransferRdnCashflow() {
    const payload: CashflowDto = {
      _validateTransferRule: true,
      category: {
        name: 'Transfer Internal',
        status: 'transfer',
      },
      price: 10000,
      product_service: 'Perisapan Investasi',
      transaction_at: new Date().toISOString(),
      from_asset: 'Seabank',
      to_asset: 'RDN Bibit',
      note:"Otomatis dari Webhook"
    };
    return await this.cashflowFormService.createNewCashflowData(payload);
  }

  @Get('transfer-to-rdpu')
  async createNewSipCashflow() {
    const payload: CashflowDto = {
      _validateTransferRule: true,
      category: {
        name: 'Investasi',
        status: 'transfer',
      },
      price: 10000,
      product_service: 'Investasi RDPU',
      transaction_at: new Date().toISOString(),
      from_asset: 'RDN Bibit',
      to_asset: 'Bahana Likuid Syariah Kelas G',
      note:"Otomatis dari Webhook"
    };
    return await this.cashflowFormService.createNewCashflowData(payload);
  }
}
