import z from "zod";

export const purchaseConsumablesSchema = z.object({
  consumable_name: z.string().min(1, "Nama perlengkapan wajib diisi"),
  quantity: z
    .number({ message: "Jumlah wajib diisi" })
    .min(1, "Jumlah minimal 1"),
  unit_price: z
    .number({ message: "Harga satuan wajib diisi" })
    .min(0, "Harga satuan tidak boleh negatif"),
});

export type PurchaseConsumablesSchemaType = z.infer<
  typeof purchaseConsumablesSchema
>;

export const defaultPurchaseConsumable: PurchaseConsumablesSchemaType = {
  consumable_name: "",
  quantity: 0,
  unit_price: 0,
};
