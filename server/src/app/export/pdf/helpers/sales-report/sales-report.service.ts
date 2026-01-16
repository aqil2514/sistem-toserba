import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import puppeteer from 'puppeteer';
import { buildHtml } from './utils.sales-report';
import { SalesReportService as SalesReport } from '../../../../sales/helper/sales-report.service';
import { SalesReportQuery } from '../../../../sales/interface/sales-report.interface';
import {
  endOfTodayUtcJakarta,
  startOfTodayUtcJakarta,
} from '../../../../../utils/format-date';

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

  async export() {
    const browser = await puppeteer.launch({ headless: true });
    const [summary, fullDetail, productSummary, categoryChart] =
      await Promise.all([
        this.salesReportService.getSalesSummaryContent(this.defaultQuery),
        this.salesReportService.getSalesReport(this.defaultQuery),
        this.salesReportService.getSalesReportProductSummary(this.defaultQuery),
        this.salesReportService.getSalesReportPerCategory(this.defaultQuery),
      ]);
    const html = buildHtml({ summary, fullDetail, productSummary, categoryChart });

    try {
      const page = await browser.newPage();

      await page.setViewport({ width: 1200, height: 800 });

      await page.setContent(html, {
        waitUntil: 'networkidle0',
      });

      return await page.pdf({
        format: 'A4',
      });
    } finally {
      await browser.close();
    }
  }
}
