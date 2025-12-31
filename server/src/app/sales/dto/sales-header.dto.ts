import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { SalesItemDto } from './sales-item.dto';

export class SalesHeaderDto {
  @IsNumber()
  @Min(1, { message: 'Total omzet tidak valid' })
  total_amount: number;

  @IsString()
  @IsNotEmpty({ message: 'Metode pembayaran wajib diisi' })
  payment_method: string;

  @IsString()
  @IsNotEmpty({ message: 'Nama pembeli wajib diisi' })
  customer_name: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsDateString()
  @IsNotEmpty({ message: 'Tanggal transaksi penjualan wajib diisi' })
  transaction_at: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SalesItemDto)
  items: SalesItemDto[];
}
