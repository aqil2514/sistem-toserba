import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  Min,
  IsOptional,
  IsUUID,
  IsDateString,
  IsBoolean,
  IsArray,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';

export class ThirdPartyDto {
  @IsString()
  source: string;

  @IsNumber()
  @Min(1)
  amount: number;

  @IsOptional()
  @IsString()
  note?: string;
}

export class CashCountDetailDto {
  @IsUUID()
  denominationId: string;

  @IsNumber()
  @Min(0)
  quantity: number;
}

export class CreateCashCountDto {
  @IsDateString()
  date: string;

  @IsBoolean()
  isHaveThirdParty: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ThirdPartyDto)
  thirdParty?: ThirdPartyDto[];

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CashCountDetailDto)
  detail: CashCountDetailDto[];

  @IsOptional()
  @IsString()
  notes?: string;
}
