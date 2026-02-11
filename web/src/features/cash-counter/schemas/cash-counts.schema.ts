import z from "zod";

export const thirdPartySchema = z.object({
  source: z.string().min(1, "Sumber dana wajib diisi"),
  amount: z.number().min(1, "Nominal data wajib diisi"),
  note: z.string().optional(),
});

export const cashCountsDetail = z.object({
  denominationId: z.uuid("ID Denominasi tidak valid"),
  quantity: z.number(),
});

export const cashCountsSchema = z.object({
  date: z.iso
    .datetime("Tanggal hitung uang wajib diisi")
    .refine(
      (val) => new Date(val) <= new Date(),
      "Tanggal tidak boleh dari masa depan",
    ),
  isHaveThirdParty: z.boolean(),
  thirdParty: z.array(thirdPartySchema).optional(),
  detail: z.array(cashCountsDetail).min(1, "Detail wajib diisi"),
});

export type ThirdPartySchemaType = z.infer<typeof thirdPartySchema>;
export type CashCountsDetailSchemaType = z.infer<typeof cashCountsDetail>;
export type CashCountSchemaType = z.infer<typeof cashCountsSchema>;

export const defaultThirdPartySchema: ThirdPartySchemaType = {
  amount: 0,
  source: "",
};

export const defaultCashcountsDetail: CashCountsDetailSchemaType = {
  denominationId: "",
  quantity: 0,
};

export const defaultCashCounts: CashCountSchemaType = {
  date: "",
  isHaveThirdParty: false,
  detail: [defaultCashcountsDetail],
};
