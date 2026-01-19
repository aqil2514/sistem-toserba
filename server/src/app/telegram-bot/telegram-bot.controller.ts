import { Controller, Get, Query, UnauthorizedException } from '@nestjs/common';
import { TelegramBotService } from './telegram-bot.service';
import { SalesReportService } from '../export/pdf/helpers/sales-report/sales-report.service';

@Controller('telegram-bot')
export class TelegramBotController {
  constructor(
    private readonly telegramBotService: TelegramBotService,
    private readonly salesReportService: SalesReportService,
  ) {}

  @Get('send-sales-report')
  async sendSalesReport(@Query('token') token: string) {
    if (token !== process.env.TELEGRAM_CRON_TOKEN) {
      return new UnauthorizedException('Akses tidak diizinkan');
    }
    const pdf = await this.salesReportService.export();
    const pdfBuffer = Buffer.from(pdf);
    return await this.telegramBotService.sendPdf(pdfBuffer, "Laporan Penjualan Harian");
  }
}
