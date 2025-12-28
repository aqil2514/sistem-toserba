import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  UseGuards,
} from '@nestjs/common';
import path from 'node:path';
import * as fs from 'fs';
import { createClient } from '@supabase/supabase-js';
import { PasetoGuard } from 'src/guards/paseto.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { PurchaseService } from './purchase.service';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Get()
  async getPurchase() {
    return await this.purchaseService.findAll();
  }

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Get(':id')
  async getPurchaseItem(@Param('id') id: string) {
    return await this.purchaseService.findByIdWithItems(id);
  }

  //   private supabase = createClient(
  //     process.env.SUPABASE_URL!,
  //     process.env.SUPABASE_SERVICE_ROLE_KEY!,
  //   );

  // TODO : Buat handler buat migrasi data, dari data lama ke data baru
  // ⚠️ ENDPOINT SEMENTARA – HAPUS SETELAH MIGRASI
  //   @Get('migrate')
  //   async migratePurchases() {
  //     try {
  //       const filePath = path.join(process.cwd(), 'purchase-rows.json');

  //       const raw = fs.readFileSync(filePath, 'utf-8');
  //       const oldPurchases = JSON.parse(raw);

  //       const payload = oldPurchases.map((p: any) => ({
  //         id: p.id,
  //         purchase_code: p.purchase_code,
  //         purchase_date: p.purchase_date,
  //         supplier_name: p.supplier_name || null,
  //         supplier_type: p.supplier_type || null,
  //         notes: p.notes && p.notes.trim() !== '' ? p.notes : null,
  //         created_at: p.created_at,
  //         deleted_at:
  //           p.deleted_at && p.deleted_at.trim() !== '' ? p.deleted_at : null,
  //       }));

  //       const { error, count } = await this.supabase
  //         .from('purchases')
  //         .upsert(payload, {
  //           onConflict: 'id',
  //           count: 'exact',
  //         });

  //       if (error) {
  //         throw error;
  //       }

  //       return {
  //         message: 'Purchase migration success',
  //         total: payload.length,
  //         inserted_or_updated: count,
  //       };
  //     } catch (err: any) {
  //       console.error(err);
  //       throw new InternalServerErrorException('Purchase migration failed');
  //     }
  //   }

  //   // ⚠️ ENDPOINT SEMENTARA – HAPUS SETELAH MIGRASI
  //   @Get('migrate-items')
  //   async migratePurchaseItems() {
  //     function normalizeTimestamp(value: any): string | null {
  //       if (!value) return null;

  //       if (typeof value !== 'string') return null;

  //       const trimmed = value.trim();

  //       if (trimmed === '') return null;

  //       const date = new Date(trimmed);

  //       // ❗ INI KUNCI UTAMANYA
  //       if (isNaN(date.getTime())) {
  //         return null;
  //       }

  //       return trimmed;
  //     }

  //     try {
  //       const filePath = path.join(process.cwd(), 'purchase-item-rows.json');

  //       const raw = fs.readFileSync(filePath, 'utf-8');
  //       const oldItems = JSON.parse(raw);

  //       const payload = oldItems.map((i: any) => ({
  //         id: i.id,
  //         purchase_id: i.purchase_id,
  //         product_id: i.product_id,

  //         quantity: Number(i.quantity),
  //         remaining_quantity: Number(i.remaining_quantity),

  //         price: Number(i.price),
  //         hpp:
  //           i.hpp !== null && i.hpp !== undefined && i.hpp !== ''
  //             ? Number(i.hpp)
  //             : null,

  //         created_at: normalizeTimestamp(i.created_at),

  //         deleted_at: normalizeTimestamp(i.deleted_at),
  //       }));

  //       const { error, count } = await this.supabase
  //         .from('purchase_items')
  //         .upsert(payload, {
  //           onConflict: 'id',
  //           count: 'exact',
  //         });

  //       if (error) {
  //         throw error;
  //       }

  //       return {
  //         message: 'Purchase items migration success',
  //         total: payload.length,
  //         inserted_or_updated: count,
  //       };
  //     } catch (err: any) {
  //       console.error(err);
  //       throw new InternalServerErrorException('Purchase items migration failed');
  //     }
  //   }
}
