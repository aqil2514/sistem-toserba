import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { RoleGuard } from '../../guards/role.guard';
import { Roles } from '../../decorator/roles.decorator';
import { PasetoGuard } from '../../guards/paseto.guard';
import path from 'node:path';
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
import { CreateProductDto } from './dto/create-product.dto';

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

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Get('stocks')
  async getProductStocks() {
    return await this.productService.getProductStock();
  }

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Get(':id/in')
  async getInProductsHistory(@Param('id') id: string) {
    return await this.productService.getInProductHistory(id);
  }

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Post()
  async addProduct(@Body() dto: CreateProductDto) {
    return await this.productService.create(dto);
  }

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Patch(':id')
  async patchProduct(@Body() dto: CreateProductDto, @Param('id') id: string) {
    return await this.productService.update(id, dto);
  }

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Delete(':id')
  async softDeleteProduct(@Param('id') id: string) {
    return await this.productService.remove(id);
  }

  // ⚠️ ENDPOINT SEMENTARA – HAPUS SETELAH MIGRASI
  // @Get('migrate')
  // async migrateProducts() {
  //   try {
  //     const filePath = path.join(process.cwd(), 'migrate-product.json');
  //     const raw = fs.readFileSync(filePath, 'utf-8');
  //     const oldProducts = JSON.parse(raw);

  //     const payload = oldProducts.map((p: any) => ({
  //       id: p.id,
  //       name: p.name,
  //       price: p.price,
  //       category: p.category,
  //       unit: 'pcs', // default unit warung
  //       created_at: p.created_at,
  //       updated_at: p.updated_at,
  //       deleted_at: p.deleted_at || null,
  //     }));

  //     const { error, count } = await this.supabase
  //       .from('products')
  //       .upsert(payload, { onConflict: 'id', count: 'exact' });

  //     if (error) {
  //       throw error;
  //     }

  //     return {
  //       message: 'Migration success',
  //       total: payload.length,
  //       inserted_or_updated: count,
  //     };
  //   } catch (err: any) {
  //     console.error(err);
  //     throw new InternalServerErrorException('Product migration failed');
  //   }
  // }
}
