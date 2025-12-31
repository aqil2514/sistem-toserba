import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesQuery } from './interface/sales-query.interface';
import { PasetoGuard } from 'src/guards/paseto.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { CreateSalesDto } from './dto/create-sales.dto';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}
  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Get()
  async getTransaction(@Query() query: SalesQuery) {
    return await this.salesService.findByQuery(query);
  }

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Get(':sales_id')
  async getTransactionBySalesId(@Param('sales_id') sales_id: string) {
    return await this.salesService.findItemBySalesId(sales_id);
  }

  @UseGuards(PasetoGuard, RoleGuard)
  @Roles('admin')
  @Post()
  async createNewTransaction(@Body() body: CreateSalesDto) {
    return await this.salesService.createNewTransaction(body);
  }

  // TODO : BUAT Post untuk upload ke db

  //   private supabase = createClient(
  //     process.env.SUPABASE_URL!,
  //     process.env.SUPABASE_SERVICE_ROLE_KEY!,
  //   );
  //   Nanti pakek lagi kalo mau recovery (DATA SALES)
  //   @Get('migrate')
  //   async migrateData() {
  //     const salesPath = path.join(process.cwd(), 'Transaction Rows.json');
  //     const sales = JSON.parse(fs.readFileSync(salesPath, 'utf-8'));
  //     function normalizeTimestamp(value: any) {
  //       if (!value || value === '') return null;
  //       return value;
  //     }
  //     function normalizeUUID(value: any) {
  //       if (!value || value === '') return null;
  //       return value;
  //     }
  //     const newSales: SalesDb[] = [];
  //     for (const sale of sales) {
  //       if (isNaN(Number(sale.total_amount))) {
  //         console.log('INVALID total_amount', sale.id, sale.total_amount);
  //         continue;
  //       }
  //       const newSale: SalesDb = {
  //         id: normalizeUUID(sale.id),
  //         customer_name: sale.customer_name,
  //         notes: sale.notes,
  //         payment_method: sale.payment_method,
  //         sales_code: sale.transaction_code,
  //         total_amount: Number(sale.total_amount),
  //         created_at: normalizeTimestamp(sale.created_at),
  //         transaction_at: normalizeTimestamp(sale.transaction_at),
  //         deleted_at: normalizeTimestamp(sale.deleted_at),
  //       };
  //       newSales.push(newSale);
  //     }
  //     try {
  //       /** 1️⃣ HAPUS SEMUA DATA LAMA (FK-safe) */
  //       const { error: deleteError } = await this.supabase
  //         .from('sales')
  //         .delete()
  //         .neq('id', '00000000-0000-0000-0000-000000000000'); // hack supabase wajib filter
  //       if (deleteError) return { error: deleteError };
  //       /** 2️⃣ INSERT DATA BARU */
  //       const { error: insertError } = await this.supabase
  //         .from('sales')
  //         .insert(newSales);
  //       if (insertError) return { error: insertError };
  //       return {
  //         message: 'Migrasi sukses',
  //         total: newSales.length,
  //       };
  //     } catch (error) {
  //       return { error };
  //     }
  //   }
  //   @Get('migrate')
  //   async migrateData() {
  //     const salesItemPath = path.join(
  //       process.cwd(),
  //       'Transaction Items Rows.json',
  //     );
  //     const salesItem = JSON.parse(fs.readFileSync(salesItemPath, 'utf-8'));
  //     const newItems: SalesItemDb[] = [];
  //     const { data: sales } = await this.supabase
  //       .from('sales')
  //       .select('id, transaction_at');
  //     const salesMap = new Map(sales.map((s) => [s.id, s.transaction_at]));
  //     function normalizeTimestamp(value: any) {
  //       if (!value || value === '') return null;
  //       return value;
  //     }
  //     for (const item of salesItem) {
  //       const transactionAt = salesMap.get(item.transaction_id);
  //       if (!transactionAt) {
  //         console.warn('Transaction not found for sales_id', item.transaction_id);
  //       }
  //       const newItem: SalesItemDb = {
  //         deleted_at: normalizeTimestamp(item.deleted_at),
  //         discount: Number(item.discount),
  //         hpp: Number(item.hpp),
  //         id: item.id,
  //         margin: Number(item.margin),
  //         product_id: item.product_id,
  //         quantity: Number(item.quantity),
  //         sales_id: item.transaction_id,
  //         subtotal: Number(item.subtotal),
  //         tip: Number(item.tip),
  //         transaction_date: normalizeTimestamp(transactionAt),
  //       };
  //       newItems.push(newItem);
  //     }
  //     try {
  //       const { error } = await this.supabase
  //         .from('sales_items')
  //         .insert(newItems);
  //       if (error) return { error };
  //       return { message: 'Migrasi sukses' };
  //     } catch (error) {
  //       return { error };
  //     }
  //     return { newItems };
  //   }
}
