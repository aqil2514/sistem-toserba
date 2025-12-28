import { z } from "zod";

/**
 * ITEM BARANG MASUK
 */
export const purchaseItemSchema = z.object({
  product_id: z.string().min(1, "Produk wajib dipilih"),

  quantity: z
    .number()
    .int("Jumlah harus bilangan bulat")
    .min(1, "Jumlah minimal 1"),

  price: z.number().min(1, "Harga harus lebih dari 0"),
});

/**
 * PURCHASE (BARANG MASUK)
 */
export const purchaseSchema = z.object({
  purchase_date: z.date().optional(),

  purchase_code: z.string().optional(),

  supplier_name: z.string().optional(),

  supplier_type: z.string().optional(),

  notes: z.string().optional(),

  items: z.array(purchaseItemSchema).min(1, "Minimal harus ada 1 barang"),
});

export type PurchaseFormValues = z.infer<typeof purchaseSchema>;
export type PurchaseItemFormValues = z.infer<typeof purchaseItemSchema>;
