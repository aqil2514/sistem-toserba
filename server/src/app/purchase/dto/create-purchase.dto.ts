import {
  IsArray,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePurchaseItemDto } from './create-purchase-item.dto';
import { PURCHASE_TYPE } from '../enums/purchase-type.enum';
import { PurchaseStatus, PurchaseType } from '../interface/purchase.interface';
import { PURCHASE_STATUS } from '../enums/purchase-status.enum';

export class CreatePurchaseDto {
  @IsOptional()
  @IsDateString()
  purchase_date: string;

  @IsOptional()
  @IsString()
  purchase_code?: string;

  @IsEnum(PURCHASE_TYPE)
  purchase_type: PurchaseType;

  @IsEnum(PURCHASE_STATUS)
  purchase_status: PurchaseStatus;

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
