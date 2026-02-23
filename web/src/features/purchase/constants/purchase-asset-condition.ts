import { LabelValue } from "@/@types/general";
import { PurchaseAssetsSchemaType } from "../schema/items/purchase-assets.schema";

export const assetConditionLabel: Record<
  PurchaseAssetsSchemaType["condition"],
  string
> = {
  new: "Baru",
  second: "Bekas",
  damaged: "Rusak",
};

export const assetConditionOptions: LabelValue<string>[] = [
  ...Object.entries(assetConditionLabel).map(([key, value]) => ({
    label: value,
    value: key,
  })),
];
