import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SalesReportService as SalesReport } from '../../../../sales/services/sales-report.service';
import {
  SalesReportProductRpcReturn,
  SalesReportQuery,
  SalesReportSummaryRpcReturn,
} from '../../../../sales/interface/sales-report.interface';
import {
  endOfTodayUtcJakarta,
  startOfTodayUtcJakarta,
} from '../../../../../utils/format-date';

import { PDFDocument, RGB, rgb } from 'pdf-lib';
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
import { DataQueryResponse } from '../../../../../@types/general';
import { SalesItemApiResponse } from '../../../../../app/sales/interface/sales-items.interface';
import { drawTable } from '../general/draw-table';
import {
  buildFullDetailTableData,
  buildProductSummaryTableData,
} from './text-record/build-table-record';
import { formatRupiah } from '../../../../../utils/format-to-rupiah';
import { generatePieChartImageQuickChart } from '../general/generate-pie-chart-image';

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

  private async drawTableSalesPage(
    fullDetail: DataQueryResponse<SalesItemApiResponse[]>,
    productSummary: DataQueryResponse<SalesReportProductRpcReturn[]>,
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

    const START_X = 60;
    let currentY = height - 80;

    // =========================
    // TABLE 1 — FULL DETAIL
    // =========================
    page.drawText('Detail Penjualan (Top Transaksi)', {
      x: START_X,
      y: currentY,
      font: font.timesRomanBold,
      size: 15,
    });

    currentY -= 24;

    page.drawText(
      'Menampilkan transaksi dengan kontribusi penjualan tertinggi.',
      {
        x: START_X,
        y: currentY,
        font: font.timesRoman,
        size: 11,
        color: rgb(0.4, 0.4, 0.4),
      },
    );

    currentY -= 20;

    const fullDetailResult = drawTable({
      pdfDoc: doc,
      page,
      headers: ['Pembeli', 'Produk', 'Qty', 'Subtotal'],
      data: buildFullDetailTableData(fullDetail.data),
      startX: START_X,
      startY: currentY,
      colWidths: [160, 200, 60, 100],
      font: font.timesRoman,
      fontSize: 11,
      columnAlignments: ['center', 'center', 'center', 'center'],
    });

    currentY = fullDetailResult.y - 40;

    // =========================
    // TABLE 2 — PRODUCT SUMMARY
    // =========================
    page.drawText('Ringkasan Produk Terlaris', {
      x: START_X,
      y: currentY,
      font: font.timesRomanBold,
      size: 15,
    });

    currentY -= 24;

    page.drawText('Produk dengan volume penjualan dan kontribusi tertinggi.', {
      x: START_X,
      y: currentY,
      font: font.timesRoman,
      size: 11,
      color: rgb(0.4, 0.4, 0.4),
    });

    currentY -= 20;

    drawTable({
      pdfDoc: doc,
      page: fullDetailResult.page,
      headers: ['Produk', 'Kategori', 'Qty', 'Subtotal'],
      data: buildProductSummaryTableData(productSummary.data),
      startX: START_X,
      startY: currentY,
      colWidths: [200, 160, 60, 100],
      font: font.timesRoman,
      fontSize: 11,
      columnAlignments: ['center', 'center', 'center', 'center'],
    });
  }

  private async drawPieChartPage(
    doc: PDFDocument,
    data: { category: string; omzet: number }[],
    font: PDFFontSet,
    header: DrawHeaderConfiguration,
    footer: DrawFooterConfiguration,
    title: string,
  ) {
    const page = await this.pdfService.addPageWithLayout(
      doc,
      font,
      header,
      footer,
    );
    const { width, height } = page.getSize();
    const START_X = 60;
    let currentY = height - 80;

    // =====================
    // Judul di tengah + underline
    // =====================
    const titleWidth = font.timesRomanBold.widthOfTextAtSize(title, 16);
    const titleX = width / 2 - titleWidth / 2;

    page.drawText(title, {
      x: titleX,
      y: currentY,
      font: font.timesRomanBold,
      size: 16,
      color: rgb(0, 0, 0),
    });

    // Underline
    page.drawLine({
      start: { x: titleX, y: currentY - 4 },
      end: { x: titleX + titleWidth, y: currentY - 4 },
      thickness: 1,
      color: rgb(0.6, 0.6, 0.6),
    });

    currentY -= 40;

    // =====================
    // Palette warna tetap
    // =====================
    const palette = [
      rgb(0.12, 0.55, 0.25),
      rgb(0.85, 0.55, 0.05),
      rgb(0.75, 0.15, 0.15),
      rgb(0.2, 0.6, 0.85),
      rgb(0.7, 0.3, 0.85),
      rgb(0.85, 0.25, 0.55),
    ];

    function rgbToCss(rgb: RGB) {
      const r = Math.round(rgb.red * 255);
      const g = Math.round(rgb.green * 255);
      const b = Math.round(rgb.blue * 255);
      return `rgb(${r},${g},${b})`;
    }

    const chartPalette = palette.map(rgbToCss);

    const chartBuffer = await generatePieChartImageQuickChart(
      data,
      600,
      400,
      chartPalette,
    );

    const pngImage = await doc.embedPng(chartBuffer);
    const pngDims = pngImage.scale(1);

    const chartX = width / 2 - pngDims.width / 2;
    const chartY = currentY - pngDims.height;

    page.drawImage(pngImage, {
      x: chartX,
      y: chartY,
      width: pngDims.width,
      height: pngDims.height,
    });

    currentY = chartY - 30; // beri jarak ekstra sebelum tabel

    // =====================
    // Detail per chart (tabel kecil)
    // =====================
    const totalOmzet = data.reduce((sum, d) => sum + d.omzet, 0);
    const tableData: string[][] = data.map((d) => [
      d.category,
      formatRupiah(d.omzet),
      `${((d.omzet / totalOmzet) * 100).toFixed(1)}%`,
    ]);

    drawTable({
      pdfDoc: doc,
      page,
      headers: ['Kategori', 'Omzet', '%'],
      data: tableData,
      startX: START_X + 30,
      startY: currentY,
      colWidths: [200, 120, 80],
      font: font.timesRoman,
      fontSize: 11,
      columnAlignments: ['left', 'right', 'right'],
    });

    currentY -= tableData.length * 22 + 30; // beri jarak ekstra sebelum insight
  }

  async export(query: SalesReportQuery = this.defaultQuery) {
    const [summary, fullDetail, productSummary, categoryChart] =
      await Promise.all([
        this.salesReportService.getSalesSummaryContent(query),
        this.salesReportService.getSalesReport(query),
        this.salesReportService.getSalesReportProductSummary(query),
        this.salesReportService.getSalesReportPerCategory(query),
      ]);

    const pdfDoc = await PDFDocument.create();
    const fontSet = await this.pdfService.getPDFFont(pdfDoc);

    const header: DrawHeaderConfiguration = {
      leftText: 'Laporan Penjualan',
      rightText: `Per ${formatDateLuxon(query.from, '29 Desember 2025')}`,
    };
    const footer: DrawFooterConfiguration = {
      leftText: `Dibuat pada ${formatDateLuxon(new Date(), 'Senin, 29 Desember 2025')}`,
      rightText: '',
    };

    await this.drawSummarySalesPage(summary, pdfDoc, fontSet, header, footer);
    await this.drawTableSalesPage(
      fullDetail,
      productSummary,
      pdfDoc,
      fontSet,
      header,
      footer,
    );
    await this.drawPieChartPage(
      pdfDoc,
      categoryChart,
      fontSet,
      header,
      footer,
      'Alokasi Kategori dari Produk yang Terjual',
    );

    const pdfBytes = await pdfDoc.save();

    return pdfBytes;
  }
}
