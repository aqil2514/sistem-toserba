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
  purchase_date: z.iso
    .datetime("Tanggal Transaksi wajib diisi")
    .refine(
      (val) => new Date(val) <= new Date(),
      "Tanggal tidak boleh dari masa depan",
    ),

  purchase_code: z.string().optional(),

  supplier_name: z.string().min(1, "Nama Suplier wajib diisi"),

  supplier_type: z.string().min(1, "Tipe supplier wajib diisi"),

  notes: z.string().optional(),

  items: z.array(purchaseItemSchema).min(1, "Minimal harus ada 1 barang"),
});

export type PurchaseFormValues = z.infer<typeof purchaseSchema>;
export type PurchaseItemFormValues = z.infer<typeof purchaseItemSchema>;

export const defaultPurchaseItem: PurchaseItemFormValues = {
  price: 0,
  product_id: "",
  quantity: 0,
};

export const EMPTY_VALUES: PurchaseFormValues = {
  purchase_date: new Date().toISOString(),
  purchase_code: "",
  supplier_name: "",
  supplier_type: "",
  notes: "",
  items: [defaultPurchaseItem],
};

