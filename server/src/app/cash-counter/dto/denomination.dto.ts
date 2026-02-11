import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

enum DenominationType {
  COIN = 'coin',
  BILL = 'bill',
}

export class DenominationDto {
  @IsString()
  @MinLength(1, { message: 'Label Denominasi wajib diisi' })
  label: string;

  @IsNumber()
  @IsPositive({ message: 'Nominal Denominasi harus positif' })
  nominal: number;

  @IsEnum(DenominationType, { message: 'Tipe tidak cocok' })
  @Transform(({ value }) => value.toLowerCase())
  type?: string;

  @IsBoolean()
  is_active: boolean;
}
