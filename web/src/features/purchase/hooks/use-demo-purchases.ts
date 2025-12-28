"use client";

import { useState } from "react";
import { PurchaseFormValues } from "../schema/purchase.schema";
import { Purchase } from "../types/purchase";
import { DUMMY_PURCHASES } from "../data/dummy-purchases";
import { Product } from "../../products/type";

const STORAGE_KEY = "toserba-demo-purchases";
const PRODUCT_STORAGE_KEY = "toserba-demo-products";

function loadInitialData(): Purchase[] {
  if (typeof window === "undefined") return DUMMY_PURCHASES;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return DUMMY_PURCHASES;
    }
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(DUMMY_PURCHASES));
  return DUMMY_PURCHASES;
}

function loadProducts(): Product[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(PRODUCT_STORAGE_KEY);
  if (!stored) return [];

  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function useDemoPurchases() {
  const [data, setData] = useState<Purchase[]>(loadInitialData);

  function save(next: Purchase[]) {
    setData(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function create(values: PurchaseFormValues) {
    console.log("[DEMO] CREATE PURCHASE", values);

    const newPurchase: Purchase = {
      id: `demo-${Date.now()}`,
      purchase_code: `DEMO-${Date.now()}`,
      purchase_date:
        values.purchase_date?.toISOString() ?? new Date().toISOString(),
      supplier_name: values.supplier_name ?? null,
      supplier_type: values.supplier_type ?? null,
      notes: values.notes ?? null,
      created_at: new Date().toISOString(),
      deleted_at: null,
    };

    save([newPurchase, ...data]);
  }

  function update(id: string, values: Partial<Purchase>) {
    console.log("[DEMO] UPDATE PURCHASE", id, values);

    save(data.map((p) => (p.id === id ? { ...p, ...values } : p)));
  }

  function remove(id: string) {
    console.log("[DEMO] DELETE PURCHASE", id);
    save(data.filter((p) => p.id !== id));
  }

  /**
   * Helper: ambil nama produk (DEMO)
   */
  function getProductName(productId: string): string {
    const products = loadProducts();
    return (
      products.find((p) => p.id === productId)?.name ?? "Produk tidak ditemukan"
    );
  }

  return {
    data,
    isLoading: false,
    create,
    update,
    remove,
    getProductName,
  };
}
