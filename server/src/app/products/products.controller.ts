import {
  Controller,
  Get,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { PasetoGuard } from 'src/guards/paseto.guard';
import path from 'node:path';
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

@Controller('products')
export class ProductsController {
  private supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  constructor(private readonly productService: ProductsService) {}

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Get()
  async getProducts() {
    return await this.productService.findAll();
  }

  // ⚠️ ENDPOINT SEMENTARA – HAPUS SETELAH MIGRASI
  @Get('migrate')
  async migrateProducts() {
    try {
      const filePath = path.join(process.cwd(), 'migrate-product.json');
      const raw = fs.readFileSync(filePath, 'utf-8');
      const oldProducts = JSON.parse(raw);

      const payload = oldProducts.map((p: any) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        category: p.category,
        unit: 'pcs', // default unit warung
        created_at: p.created_at,
        updated_at: p.updated_at,
        deleted_at: p.deleted_at || null,
      }));

      const { error, count } = await this.supabase
        .from('products')
        .upsert(payload, { onConflict: 'id', count: 'exact' });

      if (error) {
        throw error;
      }

      return {
        message: 'Migration success',
        total: payload.length,
        inserted_or_updated: count,
      };
    } catch (err: any) {
      console.error(err);
      throw new InternalServerErrorException('Product migration failed');
    }
  }
}
