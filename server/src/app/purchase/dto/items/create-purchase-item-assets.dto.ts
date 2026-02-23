import { IsEnum, IsNumber, IsString, Min } from 'class-validator';

export class CreatePurchaseItemAssetsDto {
  @IsString()
  asset_name: string;

  @IsNumber()
  @Min(1)
  unit_count: number;

  @IsNumber()
  @Min(0)
  unit_price: number;

  @IsEnum(['new', 'second', 'damaged'])
  condition: 'new' | 'second' | 'damaged';
}