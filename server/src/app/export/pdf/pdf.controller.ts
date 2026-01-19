import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { SalesReportService } from './helpers/sales-report/sales-report.service';
import { Response } from 'express';
import { SalesReportQuery } from '../../../app/sales/interface/sales-report.interface';
import { PasetoGuard } from '../../../guards/paseto.guard';
import { RoleGuard } from '../../../guards/role.guard';
import { Roles } from '../../../decorator/roles.decorator';

@Controller('pdf')
export class PdfController {
  constructor(private readonly salesReportService: SalesReportService) {}

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Get('sales-report')
  async exportSalesReport(
    @Res() res: Response,
    @Query() query?: SalesReportQuery,
  ) {
    const pdf = await this.salesReportService.export(query);

    res.set({
      'Content-Type': 'application/pdf',
      // 'Content-Disposition': 'attachment; filename="Laporan Penjualan.pdf"',
      'Content-Disposition': 'inline',
      // 'Content-Length': pdf.length,
    });

    res.end(Buffer.from(pdf));
  }
}
