import { Controller, Get, Res } from '@nestjs/common';
import { SalesReportService } from './helpers/sales-report/sales-report.service';
import { Response } from 'express';

@Controller('pdf')
export class PdfController {
  constructor(private readonly salesReportService: SalesReportService) {}

  @Get('sales-report')
  async exportSalesReport(@Res() res: Response) {
    const pdf = await this.salesReportService.export();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline',
    });

    res.end(pdf);
  }
}
