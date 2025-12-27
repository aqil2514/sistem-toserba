import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  price: z.number().min(0, "Harga tidak valid"),
  category: z.string().min(1, "Kategori wajib diisi"),
  subcategory: z.string().optional(),
  unit: z.string().min(1, "Satuan wajib diisi"),
});

export type ProductFormValues = z.infer<typeof productSchema>;
