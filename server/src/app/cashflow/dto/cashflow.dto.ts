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
  ValidationArguments,
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

@ValidatorConstraint({ name: 'CashflowTransferRule', async: false })
class CashflowTransferRule implements ValidatorConstraintInterface {
  validate(_: any, args: ValidationArguments) {
    const obj = args.object as any;

    if (obj.category?.status === 'transfer') {
      if (!obj.from_asset || !obj.to_asset) return false;
      if (obj.from_asset === obj.to_asset) return false;
    } else {
      if (!obj.via) return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    const obj = args.object as any;

    if (obj.category?.status === 'transfer') {
      if (!obj.from_asset || !obj.to_asset) {
        return 'Transfer wajib memiliki aset asal dan tujuan';
      }

      if (obj.from_asset === obj.to_asset) {
        return 'Aset asal dan tujuan tidak boleh sama';
      }
    }

    return 'Aset wajib diisi';
  }
}

export class CashflowDto {
  @Validate(CashflowTransferRule)
  _validateTransferRule: boolean;

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
  @IsOptional()
  via?: string;

  // Transfer Cashflow Start
  @IsOptional()
  @IsString()
  from_asset?: string;

  @IsOptional()
  @IsString()
  to_asset?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  transfer_fee?: number;

  @IsOptional()
  @IsString()
  transfer_fee_asset?: string;
  // Transfer Cashflow End

  // Receivable Cashflow Start
  @IsOptional()
  @IsString()
  receivable_customer_name?: string;
  // Receivable Cashflow End

  @IsNumber()
  @IsPositive({ message: 'Harga tidak valid' })
  price: number;

  @IsOptional()
  @IsString()
  note?: string;
}
