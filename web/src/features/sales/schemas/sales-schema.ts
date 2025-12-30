import z from "zod";
import { defaultSalesItemSchema, salesItemSchema } from "./sales-item-schema";

export const salesSchema = z.object({
  total_amount: z.number().min(1, "Total nominal penjualan wajib diisi"),
  payment_method: z.string(),
  customer_name: z.string().min(1, "Nama pembeli wajib diisi"),
  notes: z.string(),
  items: z.array(salesItemSchema).min(1),
  transaction_at: z.string(),
});

export type SalesSchemaType = z.infer<typeof salesSchema>;

export const defaultSalesSchema: SalesSchemaType = {
  customer_name: "",
  items: [defaultSalesItemSchema],
  notes: "",
  payment_method: "cash",
  total_amount: 0,
  transaction_at: new Date().toISOString(),
};
