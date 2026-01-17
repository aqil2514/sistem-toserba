import { PDFPage, RGB, rgb } from 'pdf-lib';
import { PDFFontSet, TextRecordValues } from '../../../interfaces/pdf.interface';
import { SalesReportSummaryRpcReturn } from '../../../../../sales/interface/sales-report.interface';

export function buildInsightTextRecord(
  page: PDFPage,
  font: PDFFontSet,
  data: SalesReportSummaryRpcReturn,
  startY: number,
): Record<string, TextRecordValues> {
  const START_X = 60;
  const LINE_HEIGHT = 22;

  // =====================
  // COLORS
  // =====================
  const COLOR_SUCCESS = rgb(0.12, 0.55, 0.25);
  const COLOR_WARNING = rgb(0.85, 0.55, 0.05);
  const COLOR_DANGER  = rgb(0.75, 0.15, 0.15);
  const COLOR_TITLE   = rgb(0, 0, 0);

  // =====================
  // Insight Builder
  // =====================
  const insights: { text: string; color: RGB }[] = [];

  // Margin
  if (data.margin_percent >= 0.3) {
    insights.push({
      text: `Margin ${(data.margin_percent * 100).toFixed(1)}% menunjukkan performa penjualan yang sehat.`,
      color: COLOR_SUCCESS,
    });
  } else if (data.margin_percent >= 0.15) {
    insights.push({
      text: `Margin ${(data.margin_percent * 100).toFixed(1)}% berada pada tingkat cukup.`,
      color: COLOR_WARNING,
    });
  } else {
    insights.push({
      text: `Margin ${(data.margin_percent * 100).toFixed(1)}% tergolong rendah dan perlu perhatian.`,
      color: COLOR_DANGER,
    });
  }

  // Markup
  if (data.markup_percent >= 0.5) {
    insights.push({
      text: `Markup ${(data.markup_percent * 100).toFixed(1)}% tergolong optimal.`,
      color: COLOR_SUCCESS,
    });
  } else {
    insights.push({
      text: `Markup ${(data.markup_percent * 100).toFixed(1)}% masih dapat ditingkatkan.`,
      color: COLOR_WARNING,
    });
  }

  // Volume transaksi
  if (data.total_transaction >= 100) {
    insights.push({
      text: `Volume transaksi tinggi (${data.total_transaction} transaksi).`,
      color: COLOR_SUCCESS,
    });
  } else {
    insights.push({
      text: `Volume transaksi relatif rendah (${data.total_transaction} transaksi).`,
      color: COLOR_WARNING,
    });
  }

  // =====================
  // Record
  // =====================
  const record: Record<string, TextRecordValues> = {
    insightTitle: {
      text: 'Ringkasan Analisis',
      isTitle: true,
      font: font.timesRomanBold,
      fontSize: 15,
      color: COLOR_TITLE,
      underline: {
        thickness: 1,
        color: rgb(0.7, 0.7, 0.7),
        offset: 6,
      },
      get width() {
        return this.font.widthOfTextAtSize(this.text, this.fontSize);
      },
      get x() {
        return START_X;
      },
      get y() {
        return startY;
      },
    },
  };

  insights.forEach((item, index) => {
    const y = startY - 30 - index * LINE_HEIGHT;

    record[`insight_${index}`] = {
      text: `• ${item.text}`,
      font: font.timesRoman,
      fontSize: 12,
      color: item.color,
      get width() {
        return this.font.widthOfTextAtSize(this.text, this.fontSize);
      },
      get x() {
        return START_X;
      },
      get y() {
        return y;
      },
    };
  });

  return record;
}
