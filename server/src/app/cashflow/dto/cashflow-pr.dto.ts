import { Transform } from 'class-transformer';
import { IsEnum, IsString } from 'class-validator';

enum CashflowPRType {
  MIX = 'mix',
  PAYABLE = 'payable',
  RECEIVABLE = 'receivable',
}

export class CashflowPRDto {
  @IsEnum(CashflowPRType)
  @Transform(({ value }) => value.toLowerCase())
  type: 'mix' | 'payable' | 'receivable';

  @IsString()
  counterpart_name: string;
}
