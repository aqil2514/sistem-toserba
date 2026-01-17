import { PDFPage, rgb } from 'pdf-lib';
import { TextRecordValues } from '../../interfaces/pdf.interface';

export function drawTextRecord(
  page: PDFPage,
  record: Record<string, TextRecordValues>,
) {
  Object.values(record).forEach((item) => {
    // 1️⃣ Background / Box (jika ada)
    if (item.box) {
      page.drawRectangle({
        x: item.box.x,
        y: item.box.y,
        width: item.box.width,
        height: item.box.height,
        borderColor: item.box.borderColor,
        borderWidth: item.box.borderWidth ?? 1,
        color: item.box.backgroundColor,
      });
    }

    // 2️⃣ Text
    page.drawText(item.text, {
      font: item.font,
      x: item.x,
      y: item.y,
      size: item.fontSize,
      color: item.color,
    });

    // 3️⃣ Underline (generic, bukan hardcoded title)
    if (item.underline || item.isTitle) {
      const underline = item.underline ?? {};

      page.drawLine({
        start: {
          x: item.x,
          y: item.y - (underline.offset ?? 4),
        },
        end: {
          x: item.x + item.width,
          y: item.y - (underline.offset ?? 4),
        },
        thickness: underline.thickness ?? 1,
        color: underline.color ?? rgb(0.7, 0.7, 0.7),
      });
    }
  });
}
