import { PDFDocument, PDFPage, PDFFont, rgb } from 'pdf-lib';

type ColumnAlign = 'left' | 'right' | 'center';

interface DrawTableOptions {
  pdfDoc: PDFDocument;
  page: PDFPage;
  headers: string[];
  data: string[][];
  startX: number;
  startY: number;
  colWidths: number[];
  font: PDFFont;
  fontSize?: number;
  rowHeight?: number;
  cellPadding?: number;
  headerBgColor?: { r: number; g: number; b: number };
  columnAlignments?: ColumnAlign[]; // ⬅️ NEW
}

export function drawTable(options: DrawTableOptions) {
  let {
    pdfDoc,
    page,
    headers,
    data,
    startX,
    startY,
    colWidths,
    font,
    fontSize = 10,
    rowHeight = 22,
    cellPadding = 5,
    headerBgColor = { r: 0.9, g: 0.9, b: 0.9 },
    columnAlignments,
  } = options;

  const pageHeight = page.getHeight();
  let y = startY;

  /** Text wrap sederhana */
  const wrapText = (text: string, maxWidth: number) => {
    const words = text.split(' ');
    const lines: string[] = [];
    let line = '';

    words.forEach((word) => {
      const testLine = line ? `${line} ${word}` : word;
      const width = font.widthOfTextAtSize(testLine, fontSize);

      if (width <= maxWidth) {
        line = testLine;
      } else {
        lines.push(line);
        line = word;
      }
    });

    if (line) lines.push(line);
    return lines;
  };

  /** Draw row */
  const drawRow = (row: string[], isHeader = false) => {
    let x = startX;
    let maxLines = 1;

    // Hitung tinggi row berdasarkan text wrap
    row.forEach((cell, i) => {
      const lines = wrapText(cell, colWidths[i] - cellPadding * 2);
      maxLines = Math.max(maxLines, lines.length);
    });

    const currentRowHeight = maxLines * (fontSize + 4) + cellPadding * 2;

    // Page break
    if (y - currentRowHeight < 40) {
      page = pdfDoc.addPage();
      y = pageHeight - 50;
    }

    row.forEach((cell, i) => {
      // Background header
      if (isHeader) {
        page.drawRectangle({
          x,
          y: y - currentRowHeight,
          width: colWidths[i],
          height: currentRowHeight,
          color: rgb(headerBgColor.r, headerBgColor.g, headerBgColor.b),
        });
      }

      // Border
      page.drawRectangle({
        x,
        y: y - currentRowHeight,
        width: colWidths[i],
        height: currentRowHeight,
        borderWidth: 1,
        borderColor: rgb(0, 0, 0),
      });

      // Text
      const lines = wrapText(cell, colWidths[i] - cellPadding * 2);
      lines.forEach((line, index) => {
        const align = columnAlignments?.[i] ?? 'left';

        let textX = x + cellPadding;

        if (align === 'right') {
          const textWidth = font.widthOfTextAtSize(line, fontSize);
          textX = x + colWidths[i] - cellPadding - textWidth;
        } else if (align === 'center') {
          const textWidth = font.widthOfTextAtSize(line, fontSize);
          textX = x + colWidths[i] / 2 - textWidth / 2;
        }

        page.drawText(line, {
          x: textX,
          y: y - cellPadding - fontSize - index * (fontSize + 4),
          size: fontSize,
          font,
        });
      });

      x += colWidths[i];
    });

    y -= currentRowHeight;
  };

  /** Header */
  drawRow(headers, true);

  /** Rows */
  data.forEach((row) => drawRow(row));

  return { page, y };
}
