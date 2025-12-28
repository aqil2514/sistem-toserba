import {
  IsString,
  IsNumber,
  IsOptional,
  Min,
  IsNotEmpty,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'Nama wajib diisi' })
  name: string;

  @IsNumber()
  @Min(1, { message: 'Harga tidak valid' })
  price: number;

  @IsString()
  @IsNotEmpty({ message: 'Kategori wajib diisi' })
  category: string;

  @IsOptional()
  @IsString()
  subcategory?: string;

  @IsString()
  @IsNotEmpty({ message: 'Satuan wajib diisi' })
  unit: string;
}
