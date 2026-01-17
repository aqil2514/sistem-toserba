import { PDFPage, rgb } from 'pdf-lib';
import {
  PDFFontSet,
  TextRecordValues,
} from '../../../interfaces/pdf.interface';
import { SalesReportSummaryRpcReturn } from '../../../../../../app/sales/interface/sales-report.interface';
import { formatRupiah } from '../../../../../../utils/format-to-rupiah';

export function buildSalesReportTextRecord(
  page: PDFPage,
  font: PDFFontSet,
  data: SalesReportSummaryRpcReturn,
): Record<string, TextRecordValues> {
  const { height, width } = page.getSize();

  const Y_START = height - 80;
  const SECTION_GAP = 56;   // jarak antar blok
  const VALUE_OFFSET = 30; // jarak key → value

  const START_X = 60;
  const VALUE_WIDTH = width - START_X * 2;

  const COLOR_KEY = rgb(0.45, 0.45, 0.45);
  const COLOR_VALUE = rgb(0, 0, 0);
  const COLOR_BORDER = rgb(0.85, 0.85, 0.85);
  const COLOR_BG = rgb(0.98, 0.98, 0.98);

  const record: Record<string, TextRecordValues> = {
    // =====================
    // JUDUL
    // =====================
    summaryTitle: {
      text: 'Ringkasan Laporan Penjualan',
      isTitle: true,
      font: font.timesRomanBold,
      fontSize: 18,
      color: rgb(0, 0, 0),
      underline: {
        thickness: 1,
        color: rgb(0.6, 0.6, 0.6),
        offset: 6,
      },
      get width() {
        return this.font.widthOfTextAtSize(this.text, this.fontSize);
      },
      get x() {
        return width / 2 - this.width / 2;
      },
      get y() {
        return Y_START;
      },
    },
  };

  // =====================
  // DATA
  // =====================
  const fields: { label: string; value: string }[] = [
    { label: 'Omzet', value: formatRupiah(data.omzet) },
    { label: 'HPP', value: formatRupiah(data.hpp) },
    { label: 'Margin', value: formatRupiah(data.omzet - data.hpp) },
    { label: 'Margin %', value: `${(data.margin_percent * 100).toFixed(2)}%` },
    { label: 'Markup %', value: `${(data.markup_percent * 100).toFixed(2)}%` },
    { label: 'Total Transaksi', value: `${data.total_transaction} Transaksi` },
  ];

  fields.forEach((item, index) => {
    const baseY = Y_START - 60 - index * SECTION_GAP;

    // KEY (atas)
    record[`${item.label}Key`] = {
      text: item.label,
      font: font.timesRomanBold,
      fontSize: 13,
      color: COLOR_KEY,
      get width() {
        return this.font.widthOfTextAtSize(this.text, this.fontSize);
      },
      get x() {
        return START_X;
      },
      get y() {
        return baseY;
      },
    };

    // VALUE (bawah + border)
    record[`${item.label}Value`] = {
      text: item.value,
      font: font.timesRoman,
      fontSize: 15,
      color: COLOR_VALUE,
      box: {
        x: START_X - 8,
        y: baseY - VALUE_OFFSET - 6,
        width: VALUE_WIDTH + 16,
        height: 26,
        backgroundColor: COLOR_BG,
        borderColor: COLOR_BORDER,
        borderWidth: 0.5,
      },
      get width() {
        return this.font.widthOfTextAtSize(this.text, this.fontSize);
      },
      get x() {
        return START_X;
      },
      get y() {
        return baseY - VALUE_OFFSET;
      },
    };
  });

  return record;
}
