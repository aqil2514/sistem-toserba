import { Module } from '@nestjs/common';
import { TelegramBotController } from './telegram-bot.controller';
import { TelegramBotService } from './telegram-bot.service';
import { PdfModule } from '../export/pdf/pdf.module';

@Module({
  imports:[PdfModule],
  controllers: [TelegramBotController],
  providers: [TelegramBotService]
})
export class TelegramBotModule {}
