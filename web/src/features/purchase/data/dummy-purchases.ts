import { Purchase } from "../types/purchase";

export const DUMMY_PURCHASES: Purchase[] = [
  {
    id: "1",
    purchase_code: "PB-001",
    purchase_date: new Date().toISOString(),
    supplier_name: "Supplier A",
    supplier_type: "grosir",
    notes: null,
    created_at: new Date().toISOString(),
    deleted_at: null,
  },
  {
    id: "2",
    purchase_code: "PB-002",
    purchase_date: new Date().toISOString(),
    supplier_name: "Pasar Tradisional",
    supplier_type: "eceran",
    notes: "Pembelian pagi",
    created_at: new Date().toISOString(),
    deleted_at: null,
  },
];
