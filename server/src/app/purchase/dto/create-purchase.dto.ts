import {
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePurchaseItemDto } from './create-purchase-item.dto';

export class CreatePurchaseDto {
  @IsOptional()
  @IsDateString()
  purchase_date: string;

  @IsOptional()
  @IsString()
  purchase_code?: string;

  @IsString()
  supplier_name: string;

  @IsString()
  supplier_type: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePurchaseItemDto)
  items: CreatePurchaseItemDto[];
}
