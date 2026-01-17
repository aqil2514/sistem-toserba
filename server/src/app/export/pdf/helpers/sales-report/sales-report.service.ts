import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { buildHtml } from './utils.sales-report';
import { SalesReportService as SalesReport } from '../../../../sales/helper/sales-report.service';
import {
  SalesReportQuery,
  SalesReportSummaryRpcReturn,
} from '../../../../sales/interface/sales-report.interface';
import {
  endOfTodayUtcJakarta,
  formatDateYYYYMMDD,
  startOfTodayUtcJakarta,
} from '../../../../../utils/format-date';
import puppeteer from 'puppeteer-core';

import { PDFDocument, PDFFont, rgb, StandardFonts } from 'pdf-lib';
import { PdfService } from '../../pdf.service';
import {
  DrawFooterConfiguration,
  DrawHeaderConfiguration,
  PDFFontSet,
  TextRecordValues,
} from '../../interfaces/pdf.interface';
import { drawTextRecord } from '../general/draw-text-record';
import { buildSalesReportTextRecord } from './text-record/build-sales-report-text-record';
import { buildInsightTextRecord } from './text-record/buil-sales-report-insight';
import { formatDateLuxon } from '../../../../../utils/format-date.luxon';

@Injectable()
export class SalesReportService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
    private readonly salesReportService: SalesReport,
    private readonly pdfService: PdfService,
  ) {}

  private defaultQuery: SalesReportQuery = {
    limit: 100,
    page: 1,
    from: startOfTodayUtcJakarta(),
    to: endOfTodayUtcJakarta(),
    filters: [],
    mode: 'full',
    content: 'summary',
  };

  private async drawSummarySalesPage(
    data: SalesReportSummaryRpcReturn,
    doc: PDFDocument,
    font: PDFFontSet,
    header: DrawHeaderConfiguration,
    footer: DrawFooterConfiguration,
  ) {
    const page = await this.pdfService.addPageWithLayout(
      doc,
      font,
      header,
      footer,
    );
    const { height } = page.getSize();

    const textRecord: Record<string, TextRecordValues> =
      buildSalesReportTextRecord(page, font, data);
    const insightRecord = buildInsightTextRecord(
      page,
      font,
      data,
      height - 80 - 70 - Object.keys(data).length * 56,
    );

    drawTextRecord(page, {
      ...textRecord,
      ...insightRecord,
    });
  }

  async export(query?: SalesReportQuery) {
    const defaultQuery =
      Object.keys(query).length === 0 ? this.defaultQuery : query;
    const [summary] = await Promise.all([
      this.salesReportService.getSalesSummaryContent(defaultQuery),
    ]);

    const pdfDoc = await PDFDocument.create();
    const fontSet = await this.pdfService.getPDFFont(pdfDoc);


    const header: DrawHeaderConfiguration = {
      leftText: 'Laporan Penjualan',
      rightText: `Per ${formatDateLuxon(defaultQuery.from, "29 Desember 2025")}`,
    };
    const footer: DrawFooterConfiguration = {
      leftText: `Dibuat pada ${formatDateLuxon(new Date(), "Senin, 29 Desember 2025")}`,
      rightText: '',
    };

    await this.drawSummarySalesPage(summary, pdfDoc, fontSet, header, footer);

    const pdfBytes = await pdfDoc.save();

    return pdfBytes;
  }

  // TODO : FIX INI npm install puppeteer-core @sparticuz/chromium Coba pakek ini
  // async export(query?: SalesReportQuery) {
  //   const defaultQuery =
  //     Object.keys(query).length === 0 ? this.defaultQuery : query;
  //   const browser = await puppeteer.launch({ headless: true });
  //   const [summary, fullDetail, productSummary, categoryChart] =
  //     await Promise.all([
  //       this.salesReportService.getSalesSummaryContent(defaultQuery),
  //       this.salesReportService.getSalesReport(defaultQuery),
  //       this.salesReportService.getSalesReportProductSummary(defaultQuery),
  //       this.salesReportService.getSalesReportPerCategory(defaultQuery),
  //     ]);
  //   const html = buildHtml({
  //     summary,
  //     fullDetail,
  //     productSummary,
  //     categoryChart,
  //   });

  //   try {
  //     const page = await browser.newPage();

  //     await page.setViewport({ width: 1200, height: 800 });

  //     await page.setContent(html, {
  //       waitUntil: 'networkidle0',
  //     });

  //     return await page.pdf({
  //       format: 'A4',
  //       displayHeaderFooter: true,

  //       margin: {
  //         top: '100px',
  //         bottom: '80px',
  //         left: '24px',
  //         right: '24px',
  //       },

  //       headerTemplate: `
  //   <div style="
  //     width: 100%;
  //     font-size: 10px;
  //     padding: 0 12px;
  //     color: #374151;
  //     display: flex;
  //     justify-content: space-between;
  //     border-bottom: 1px solid #e5e7eb;
  //   ">
  //     <span><b>Laporan Penjualan</b></span>
  //     <span>Toserba Aqil</span>
  //   </div>
  // `,

  //       footerTemplate: `
  //   <div style="
  //     width: 100%;
  //     font-size: 10px;
  //     padding: 0 12px;
  //     color: #6b7280;
  //     display: flex;
  //     justify-content: space-between;
  //   ">
  //     <span>© ${new Date().getFullYear()} Toserba Aqil</span>
  //     <span>
  //       Halaman <span class="pageNumber"></span> / <span class="totalPages"></span>
  //     </span>
  //   </div>
  // `,
  //     });
  //   } finally {
  //     await browser.close();
  //   }
  // }
}
