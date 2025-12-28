import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreatePurchaseItemDto {
  @IsString()
  @IsNotEmpty({ message: 'Produk wajib dipilih' })
  product_id: string;

  @IsInt({ message: 'Jumlah harus bilangan bulat' })
  @Min(1, { message: 'Jumlah minimal 1' })
  quantity: number;

  @IsNumber()
  @Min(1, { message: 'Harga harus lebih dari 0' })
  price: number;
}
