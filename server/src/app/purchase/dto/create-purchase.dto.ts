import {
  IsArray,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePurchaseItemDto } from './items/create-purchase-item.dto';
import { PURCHASE_TYPE } from '../enums/purchase-type.enum';
import { PurchaseStatus, PurchaseType } from '../interface/purchase.interface';
import { PURCHASE_STATUS } from '../enums/purchase-status.enum';
import { CreatePurchaseItemAssetsDto } from './items/create-purchase-item-assets.dto';
import { CreatePurchaseItemConsumablesDto } from './items/create-purchase-item-consumables.dto';

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
  @Type(({ object }) => {
    const purchaseType = object.purchase_type;

    const itemDto = {
      [PURCHASE_TYPE.STOCK]: CreatePurchaseItemDto,
      [PURCHASE_TYPE.CONSUMABLE]: CreatePurchaseItemConsumablesDto,
      [PURCHASE_TYPE.ASSETS]: CreatePurchaseItemAssetsDto,
    };
    
    return itemDto[purchaseType] ?? CreatePurchaseItemDto;
  })
  items: (CreatePurchaseItemDto | CreatePurchaseItemAssetsDto | CreatePurchaseItemConsumablesDto)[];

}
