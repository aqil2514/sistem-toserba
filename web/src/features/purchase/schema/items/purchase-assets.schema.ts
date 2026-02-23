import z from "zod";

export const purchaseAssetsSchema = z.object({
  asset_name: z.string().min(1, "Nama Aset wajib diisi"),
  unit_count: z.number({ message: "Jumlah unit wajib diisi" }).min(1, "Jumlah unit minimal 1"),
  unit_price: z.number({ message: "Harga satuan wajib diisi" }).min(0, "Harga satuan tidak boleh negatif"),
  condition: z.enum(["new", "second", "damaged"], { message: "Kondisi aset tidak valid" }),
});

export type PurchaseAssetsSchemaType = z.infer<typeof purchaseAssetsSchema>;

export const defaultPurchaseAsset: PurchaseAssetsSchemaType = {
  asset_name: "",
  condition: "new",
  unit_count: 0,
  unit_price: 0,
};
