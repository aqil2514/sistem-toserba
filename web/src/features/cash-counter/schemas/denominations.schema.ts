import z from "zod";

export const denominationSchema = z.object({
  nominal: z.number(),
  label: z.string(),
  type: z.enum(["coin", "bill"], "Tipe tidak cocok"),
  is_active: z.boolean(),
});

export type DenominationSchemaType = z.infer<typeof denominationSchema>;

export const defaultDenomination: DenominationSchemaType = {
  is_active: true,
  label: "",
  nominal: 0,
  type: "bill",
};
