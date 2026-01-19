import { Injectable } from '@nestjs/common';
import TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class TelegramBotService {
  private bot: TelegramBot;
  private chatId: string;

  constructor() {
    this.bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);
    this.chatId = process.env.TOSERBA_GROUP_ID;
  }

  async sendMessage(message: string) {
    try {
      await this.bot.sendMessage(this.chatId, message);
      console.info('Pesan berhasil dikirim!');
    } catch (err) {
      console.error('Gagal mengirim pesan:', err);
    }
  }

  async sendPdf(pdfBuffer: Buffer, filename = 'Laporan Penjualan.pdf') {
    try {
      await this.bot.sendDocument(this.chatId, pdfBuffer, {}, { filename });
      console.info('PDF berhasil dikirim ke Telegram!');
    } catch (err) {
      console.error('Gagal mengirim PDF:', err);
    }
  }
}
