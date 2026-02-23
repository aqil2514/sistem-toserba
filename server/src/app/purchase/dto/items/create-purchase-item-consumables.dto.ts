import { IsNumber, IsString, Min } from 'class-validator';

export class CreatePurchaseItemConsumablesDto {
  @IsString()
  consumable_name: string;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  @Min(0)
  unit_price: number;
}