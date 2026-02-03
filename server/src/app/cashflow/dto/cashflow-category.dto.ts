import { IsOptional, IsString, MinLength } from 'class-validator';

export class CashflowCategoryDto {
  @IsString()
  @MinLength(1, { message: 'Nama Kategori wajib diisi' })
  name: string;

  @IsString()
  @MinLength(1, { message: 'Status Cashflow wajib diisi' })
  status: string;

  @IsString()
  @IsOptional()
  description?: string;
}
