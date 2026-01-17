import { Injectable } from '@nestjs/common';
import { PDFDocument, PDFFont, PDFPage, rgb, StandardFonts } from 'pdf-lib';
import {
  DrawFooterConfiguration,
  DrawHeaderConfiguration,
  DrawHeaderFooterConfiguration,
  PDFFontSet,
} from './interfaces/pdf.interface';

@Injectable()
export class PdfService {
  private LAYOUT = {
    marginX: 40,
    headerHeight: 45,
    footerHeight: 40,
  };

  private COLORS = {
    headerBg: rgb(0.75, 0, 0), // merah lebih elegan
    headerText: rgb(1, 1, 1), // putih
    dividerOnRed: rgb(1, 1, 1),
    footerText: rgb(0.3, 0.3, 0.3), // abu gelap
    footerDivider: rgb(0.8, 0.8, 0.8),
  };

  private drawHeader(
    page: PDFPage,
    font: PDFFont,
    options: DrawHeaderConfiguration,
  ) {
    const { width, height } = page.getSize();
    const { leftText, rightText } = options;

    const FONT_SIZE = 12;
    const HEADER_Y = height - this.LAYOUT.headerHeight + 15;

    const rightWidth = font.widthOfTextAtSize(rightText, FONT_SIZE);

    // Background
    page.drawRectangle({
      x: 0,
      y: height - this.LAYOUT.headerHeight,
      width,
      height: this.LAYOUT.headerHeight,
      color: this.COLORS.headerBg,
    });

    // Left
    page.drawText(leftText, {
      x: this.LAYOUT.marginX,
      y: HEADER_Y,
      font,
      size: FONT_SIZE,
      color: this.COLORS.headerText,
    });

    // Right
    page.drawText(rightText, {
      x: width - this.LAYOUT.marginX - rightWidth,
      y: HEADER_Y,
      font,
      size: FONT_SIZE,
      color: this.COLORS.headerText,
    });

    // Divider
    page.drawLine({
      start: {
        x: this.LAYOUT.marginX,
        y: height - this.LAYOUT.headerHeight + 5,
      },
      end: {
        x: width - this.LAYOUT.marginX,
        y: height - this.LAYOUT.headerHeight + 5,
      },
      thickness: 1,
      color: this.COLORS.dividerOnRed,
      opacity: 0.5,
    });
  }

  private drawFooter(
    page: PDFPage,
    font: PDFFont,
    options: DrawFooterConfiguration,
  ) {
    const { width } = page.getSize();
    const { leftText, rightText } = options;

    const FONT_SIZE = 10;
    const FOOTER_Y = 30;

    const rightWidth = font.widthOfTextAtSize(rightText, FONT_SIZE);

    // Divider
    page.drawLine({
      start: {
        x: this.LAYOUT.marginX,
        y: FOOTER_Y + 10,
      },
      end: {
        x: width - this.LAYOUT.marginX,
        y: FOOTER_Y + 10,
      },
      thickness: 1,
      color: this.COLORS.footerDivider,
    });

    // Left
    page.drawText(leftText, {
      x: this.LAYOUT.marginX,
      y: FOOTER_Y - 5,
      font,
      size: FONT_SIZE,
      color: this.COLORS.footerText,
    });

    // Right
    page.drawText(rightText, {
      x: width - this.LAYOUT.marginX - rightWidth,
      y: FOOTER_Y - 5,
      font,
      size: FONT_SIZE,
      color: this.COLORS.footerText,
    });
  }

  async getPDFFont(doc: PDFDocument): Promise<PDFFontSet> {
    const [timesRoman, timesRomanBold, helveticaBold] = await Promise.all([
      doc.embedFont(StandardFonts.TimesRoman),
      doc.embedFont(StandardFonts.TimesRomanBold),
      doc.embedFont(StandardFonts.HelveticaBold),
    ]);

    return {
      timesRoman,
      timesRomanBold,
      helveticaBold,
    };
  }

  async addPageWithLayout(
    doc: PDFDocument,
    font: PDFFontSet,
    headerOptions: DrawHeaderConfiguration,
    footerOptions: DrawFooterConfiguration,
  ) {
    const page = doc.addPage();

    this.drawHeader(page, font.helveticaBold, headerOptions);
    this.drawFooter(page, font.helveticaBold, footerOptions);

    return page;
  }
}
