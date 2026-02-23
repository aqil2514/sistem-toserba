import { z } from "zod";
import {
  defaultPurchaseItem,
  purchaseItemSchema,
} from "./purchase-items.schema";

const itemSchemaByType: Record<string, z.ZodType> = {
  stock: purchaseItemSchema,
};

/**
 * PURCHASE (BARANG MASUK)
 */
export const purchaseSchema = z
  .object({
    purchase_date: z.iso
      .datetime("Tanggal Transaksi wajib diisi")
      .refine(
        (val) => new Date(val) <= new Date(),
        "Tanggal tidak boleh dari masa depan",
      ),

    purchase_code: z.string().optional(),

    supplier_name: z.string().min(1, "Nama Suplier wajib diisi"),

    supplier_type: z.string().min(1, "Tipe supplier wajib diisi"),

    purchase_type: z.enum(
      ["stock", "assets", "consumable", "unselect"],
      "Tipe pembelian tidak valid",
    ),

    purchase_status: z.enum(
      ["ordered", "partially_received", "received", "cancelled"],
      "Status pembelian tidak valid",
    ),

    notes: z.string().optional(),

    items: z.array(z.any()).optional(),
  })
  .superRefine(({ purchase_type, items }, ctx) => {
    if (!purchase_type || purchase_type === "unselect")
      return ctx.addIssue({
        code: "custom",
        message: "Tipe Pembelian wajib diisi!",
        path: ["purchase_type"],
      });

    if (!items || items.length === 0) {
      ctx.addIssue({
        code: "custom",
        message: "Minimal harus ada 1 barang",
        path: ["items"],
      });
      return;
    }

    const itemSchema = itemSchemaByType[purchase_type];
    if (!itemSchema) return;

    items.forEach((item, index) => {
      const result = itemSchema.safeParse(item);
      if (!result.success) {
        result.error.issues.forEach((issue) => {
          ctx.addIssue({
            ...issue,
            path: ["items", index, ...issue.path],
          });
        });
      }
    });
  });

export type PurchaseFormValues = z.infer<typeof purchaseSchema>;

export const EMPTY_VALUES: PurchaseFormValues = {
  purchase_date: new Date().toISOString(),
  purchase_code: "",
  supplier_name: "",
  supplier_type: "",
  notes: "",
  purchase_status: "ordered",
  purchase_type: "unselect",
  items: [],
};

export const defaultItemByType: Record<string, object> = {
  stock: defaultPurchaseItem,
};
