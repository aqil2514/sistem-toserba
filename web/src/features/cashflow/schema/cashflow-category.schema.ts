import z from "zod";

export const cashflowCategorySchema = z.object({
  name: z.string().min(1, "Kategori wajib diisi"),
  status: z.enum(["expense", "transfer", "income"]),
  description: z.string(),
});

export type CashflowCategorySchemaTypes = z.infer<
  typeof cashflowCategorySchema
>;

export const defaultCashflowCategory: CashflowCategorySchemaTypes = {
  description: "",
  name: "",
  status: "expense",
};
