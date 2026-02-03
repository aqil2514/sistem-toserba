import { Type } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxDate,
  MinLength,
  Validate,
  ValidateNested,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CashflowCategoryDto } from './cashflow-category.dto';

@ValidatorConstraint({ name: 'isNotFutureDate', async: false })
class IsNotFutureDate implements ValidatorConstraintInterface {
  validate(value: string) {
    return new Date(value) <= new Date();
  }

  defaultMessage(): string {
    return 'Tanggal tidak boleh dari masa depan';
  }
}

export class CashflowDto {
  @IsDateString()
  @MinLength(1, { message: 'Tanggal Transaksi wajib diisi' })
  @Validate(IsNotFutureDate)
  transaction_at: string;

  @IsString()
  @MinLength(1, { message: 'Nama Produk / Jasa wajib diisi' })
  product_service: string;

  @ValidateNested()
  @Type(() => CashflowCategoryDto)
  category: CashflowCategoryDto;

  @IsString()
  @MinLength(1, { message: 'Aset wajib diisi' })
  via: string;

  @IsNumber()
  @IsPositive({ message: 'Harga tidak valid' })
  price: number;

  @IsOptional()
  @IsString()
  note?: string;
}
