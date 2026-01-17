import { PDFFont, RGB } from 'pdf-lib';

export interface DrawHeaderConfiguration {
  leftText: string;
  rightText: string;
}

export interface DrawFooterConfiguration {
  leftText: string;
  rightText: string;
}

export interface DrawHeaderFooterConfiguration {
  header: DrawHeaderConfiguration;
  footer: DrawFooterConfiguration;
}

export interface PDFFontSet {
  timesRoman: PDFFont;
  timesRomanBold: PDFFont;
  helveticaBold: PDFFont;
}

export interface TextRecordValues {
  text: string;
  font: PDFFont;
  fontSize: number;
  color: RGB;

  readonly x: number;
  readonly y: number;
  readonly width: number;

  // UI metadata (opsional)
  isTitle?: boolean;

  underline?: {
    offset?: number; // default 4
    thickness?: number; // default 1
    color?: RGB;
  };

  box?: {
    x: number;
    y: number;
    width: number;
    height: number;
    borderColor?: RGB;
    borderWidth?: number;
    backgroundColor?: RGB;
  };
}
