import { CashflowSchemaType } from "@/features/cashflow/schema/cashflow.schema";

interface BuildAddPaymentSchemaConfig {
  type: string;
  customer_name?: string;
  vendor_name?: string;
}

export function buildAddPaymentSchema({
  type,
  customer_name,
  vendor_name,
}: BuildAddPaymentSchemaConfig): CashflowSchemaType {
  switch (type) {
    case "receivable":
      return buildReceivableSchema(customer_name);

    default:
      return buildPayableSchema(vendor_name);
  }
}

const buildReceivableSchema = (customer_name?: string): CashflowSchemaType => {
  if (!customer_name) throw new Error("Nama Pihak yang berhutang wajib diisi");
  return {
    category: {
      name: "Pelunasan Piutang",
      status: "transfer",
      description: "Pelunasan Piutang",
    },
    from_asset: "Piutang",
    to_asset: "Tunai",
    receivable_customer_name: customer_name,
    note: "Otomatis dari halaman utang piutang",
    price: 0,
    product_service: `Pelunasan Piutang | ${customer_name}`,
    transaction_at: new Date().toISOString(),
  };
};

const buildPayableSchema = (vendor_name?: string): CashflowSchemaType => {
  if (!vendor_name) throw new Error("Nama Pihak yang berhutang wajib diisi");
  return {
    category: {
      name: "Pelunasan Utang",
      status: "transfer",
      description: "Pelunasan Piutang",
    },
    from_asset: "Tunai",
    to_asset: "Utang",
    payable_vendor_name: vendor_name,
    note: "Otomatis dari halaman utang piutang",
    price: 0,
    product_service: `Pelunasan Utang | ${vendor_name}`,
    transaction_at: new Date().toISOString(),
  };
};
