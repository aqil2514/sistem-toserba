import z from "zod";
import {
  cashflowCategorySchema,
  defaultCashflowCategory,
} from "./cashflow-category.schema";

export const cashflowSchema = z.object({
  transaction_at: z.iso
    .datetime("Data Transaksi wajib diisi")
    .refine(
      (val) => new Date(val) <= new Date(),
      "Tanggal tidak boleh dari masa depan",
    ),
  product_service: z.string().min(1, "Nama Produk / Jasa wajib diisi"),
  category: cashflowCategorySchema,
  via: z.string().min(1, "Aset wajib diisi"),
  price: z.number().min(1, "Harga tidak valid"),
  note: z.string(),
});

export type CashflowSchemaType = z.infer<typeof cashflowSchema>;

export const defaultCashflow: CashflowSchemaType = {
  category: defaultCashflowCategory,
  note: "",
  price: 0,
  product_service: "",
  transaction_at: "",
  via: "",
};
