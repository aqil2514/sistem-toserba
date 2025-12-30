import z from "zod";

export const salesItemSchema = z.object({
  product_id: z.string(),
  discount: z.number(),
  quantity: z.number(),
  price: z.number(),
  subtotal: z.number(),
  tip: z.number(),
  transaction_date: z.string(),
});

export type SalesItemSchemaType = z.infer<typeof salesItemSchema>;

export const defaultSalesItemSchema: SalesItemSchemaType = {
  discount: 0,
  price: 0,
  product_id: "",
  quantity: 0,
  subtotal: 0,
  tip: 0,
  transaction_date: new Date().toISOString(),
};
