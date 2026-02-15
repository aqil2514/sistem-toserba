import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from '../services/supabase/supabase.module';
import { ProductsModule } from './products/products.module';
import { PurchaseModule } from './purchase/purchase.module';
import { SalesModule } from './sales/sales.module';
import { PdfModule } from './export/pdf/pdf.module';
import { TelegramBotModule } from './telegram-bot/telegram-bot.module';
import { CashflowModule } from './cashflow/cashflow.module';
import { AssetFinancialModule } from './asset-financial/asset-financial.module';
import { CashCounterModule } from './cash-counter/cash-counter.module';
import { ActivityModule } from './activity/activity.module';
import { BasicQueryModule } from '../services/query/query.module';

@Module({
  imports: [
    AuthModule,
    SupabaseModule,
    BasicQueryModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    ProductsModule,
    PurchaseModule,
    SalesModule,
    PdfModule,
    TelegramBotModule,
    CashflowModule,
    AssetFinancialModule,
    CashCounterModule,
    ActivityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
