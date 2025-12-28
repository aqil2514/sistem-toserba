import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from '../services/supabase/supabase.module';
import { ProductsModule } from './products/products.module';
import { PurchaseModule } from './purchase/purchase.module';

@Module({
  imports: [
    AuthModule,
    SupabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductsModule,
    PurchaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
