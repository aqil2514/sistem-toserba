import z from "zod";

export const purchaseItemSchema = z.object({
  product_id: z.string().min(1, "Produk wajib dipilih"),

  quantity: z
    .number()
    .int("Jumlah harus bilangan bulat")
    .min(1, "Jumlah minimal 1"),

  price: z.number().min(1, "Harga harus lebih dari 0"),
});

export type PurchaseItemFormValues = z.infer<typeof purchaseItemSchema>;

export const defaultPurchaseItem: PurchaseItemFormValues = {
  price: 0,
  product_id: "",
  quantity: 0,
};
