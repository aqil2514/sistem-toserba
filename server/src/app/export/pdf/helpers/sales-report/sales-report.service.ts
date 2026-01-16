import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { buildHtml } from './utils.sales-report';
import { SalesReportService as SalesReport } from '../../../../sales/helper/sales-report.service';
import { SalesReportQuery } from '../../../../sales/interface/sales-report.interface';
import {
  endOfTodayUtcJakarta,
  startOfTodayUtcJakarta,
} from '../../../../../utils/format-date';
import puppeteer from 'puppeteer-core';

@Injectable()
export class SalesReportService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
    private readonly salesReportService: SalesReport,
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

  async export(query?: SalesReportQuery) {
    const defaultQuery =
      Object.keys(query).length === 0 ? this.defaultQuery : query;
    const browser = await puppeteer.launch({ headless: true });
    const [summary, fullDetail, productSummary, categoryChart] =
      await Promise.all([
        this.salesReportService.getSalesSummaryContent(defaultQuery),
        this.salesReportService.getSalesReport(defaultQuery),
        this.salesReportService.getSalesReportProductSummary(defaultQuery),
        this.salesReportService.getSalesReportPerCategory(defaultQuery),
      ]);
    const html = buildHtml({
      summary,
      fullDetail,
      productSummary,
      categoryChart,
    });

    try {
      const page = await browser.newPage();

      await page.setViewport({ width: 1200, height: 800 });

      await page.setContent(html, {
        waitUntil: 'networkidle0',
      });

      return await page.pdf({
        format: 'A4',
        displayHeaderFooter: true,

        margin: {
          top: '100px',
          bottom: '80px',
          left: '24px',
          right: '24px',
        },

        headerTemplate: `
    <div style="
      width: 100%;
      font-size: 10px;
      padding: 0 12px;
      color: #374151;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #e5e7eb;
    ">
      <span><b>Laporan Penjualan</b></span>
      <span>Toserba Aqil</span>
    </div>
  `,

        footerTemplate: `
    <div style="
      width: 100%;
      font-size: 10px;
      padding: 0 12px;
      color: #6b7280;
      display: flex;
      justify-content: space-between;
    ">
      <span>© ${new Date().getFullYear()} Toserba Aqil</span>
      <span>
        Halaman <span class="pageNumber"></span> / <span class="totalPages"></span>
      </span>
    </div>
  `,
      });
    } finally {
      await browser.close();
    }
  }
}
