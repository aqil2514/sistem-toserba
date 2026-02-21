import { CashflowSchemaType } from "@/features/cashflow/schema/cashflow.schema";

interface BuildAddPaymentSchemaConfig {
  type: string;
  customer_name?: string;
  vendor_name?: string;
  isUpdate?: boolean;
}

export function buildAddPaymentSchema({
  type,
  customer_name,
  vendor_name,
  isUpdate,
}: BuildAddPaymentSchemaConfig): CashflowSchemaType {
  if (isUpdate) {
    switch (type) {
      case "receivable":
        return buildUpdateReceivableSchema(customer_name);

      default:
        return buildUpdatePayableSchema(vendor_name);
    }
  }
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

const buildUpdateReceivableSchema = (
  customer_name?: string,
): CashflowSchemaType => {
  if (!customer_name) throw new Error("Nama Pihak yang berhutang wajib diisi");
  return {
    category: {
      name: "Piutang",
      status: "receivable",
      description: "Piutang",
    },
    via: "Piutang",
    receivable_customer_name: customer_name,
    note: "Otomatis dari halaman utang piutang",
    price: 0,
    product_service: `Piutang | ${customer_name}`,
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

const buildUpdatePayableSchema = (vendor_name?: string): CashflowSchemaType => {
  if (!vendor_name) throw new Error("Nama Pihak yang berhutang wajib diisi");
  return {
    category: {
      name: "Utang",
      status: "payable",
      description: "Utang",
    },
    via: "Utang",
    payable_vendor_name: vendor_name,
    note: "Otomatis dari halaman utang piutang",
    price: 0,
    product_service: `Utang | ${vendor_name}`,
    transaction_at: new Date().toISOString(),
  };
};
