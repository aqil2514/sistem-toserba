import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class SalesItemDto {
  @IsString()
  @IsNotEmpty({ message: 'ID Produk wajib disertakan' })
  product_id: string;

  @IsOptional()
  @IsNumber()
  discount?: number;

  @IsOptional()
  @IsNumber()
  tip?: number;

  @IsNumber()
  @Min(1, { message: 'Kuantiti tidak valid' })
  quantity: number;

  @IsNumber()
  @Min(1, { message: 'Harga tidak valid' })
  price: number;

  @IsNumber()
  @IsOptional()
  subtotal: number;

  @IsOptional()
  @IsDateString()
  transaction_date?: string;
}
