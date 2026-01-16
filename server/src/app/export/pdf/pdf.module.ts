import { Module } from '@nestjs/common';
import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';
import { SalesReportService } from './helpers/sales-report/sales-report.service';
import { SalesReportService as SalesReport } from '../../sales/helper/sales-report.service';

@Module({
  controllers: [PdfController],
  providers: [PdfService, SalesReportService, SalesReport],
})
export class PdfModule {}
