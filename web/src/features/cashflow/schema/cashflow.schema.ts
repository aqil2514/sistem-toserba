import z from "zod";
import {
  cashflowCategorySchema,
  defaultCashflowCategory,
} from "./cashflow-category.schema";

export const cashflowSchema = z
  .object({
    transaction_at: z.iso
      .datetime("Tanggal Transaksi wajib diisi")
      .refine(
        (val) => new Date(val) <= new Date(),
        "Tanggal tidak boleh dari masa depan",
      ),
    product_service: z.string().min(1, "Nama Produk / Jasa wajib diisi"),
    category: cashflowCategorySchema,
    via: z.string().optional(),

    // Trasnfer Cashflow
    from_asset: z.string().optional(),
    to_asset: z.string().optional(),
    transfer_fee: z.number().optional(),
    transfer_fee_asset: z.string().optional(),

    // Piutang Cashflow
    receivable_customer_name: z.string().optional(),

    price: z.number().min(1, "Harga tidak valid"),
    note: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.category.status === "transfer") {
      if (!data.from_asset) {
        ctx.addIssue({
          path: ["from_asset"],
          message: "Aset asal wajib diisi",
          code: "custom",
        });
      }

      if (!data.to_asset) {
        ctx.addIssue({
          path: ["to_asset"],
          message: "Aset tujuan wajib diisi",
          code: "custom",
        });
      }

      if (
        data.from_asset &&
        data.to_asset &&
        data.from_asset === data.to_asset
      ) {
        ctx.addIssue({
          path: ["to_asset"],
          message: "Aset asal dan tujuan tidak boleh sama",
          code: "custom",
        });
      }

      if (
        data.transfer_fee &&
        data.transfer_fee > 0 &&
        !data.transfer_fee_asset
      ) {
        ctx.addIssue({
          path: ["transfer_fee_asset"],
          code: "custom",
          message: "Aset biaya trasfer wajib diisi",
        });
      }
    } 

    if(data.category.status === "receivable"){
      if(!data.receivable_customer_name){
         ctx.addIssue({
          path: ["receivable_customer_name"],
          message: "Pihak yang berutang wajib diisi",
          code: "custom",
        });
      }
    }

    if (data.category.status !== "transfer") {
      if (!data.via) {
        ctx.addIssue({
          path: ["via"],
          message: "Aset wajib diisi",
          code: "custom",
        });
      }
    }
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
