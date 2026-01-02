"use client";

import { useState } from "react";
import { PurchaseFormValues } from "../schema/purchase.schema";
import { Purchase } from "../types/purchase";
import { DUMMY_PURCHASES } from "../data/dummy-purchases";
import { Product } from "../../products/types/type";
import { toast } from "sonner";
import { MappedResponse } from "../components/detail-dialog.purchase";
import { generateDemoId } from "@/utils/generate-demo-id";

const STORAGE_KEY = "toserba-demo-purchases";
const PRODUCT_STORAGE_KEY = "toserba-demo-products";
const ITEM_STORAGE_KEY = "toserba-demo-purchase-items";

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

function loadItems(): MappedResponse[] {
  if (typeof window === "undefined") return [];

  const raw = localStorage.getItem(ITEM_STORAGE_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveItems(items: MappedResponse[]) {
  localStorage.setItem(ITEM_STORAGE_KEY, JSON.stringify(items));
}

export function useDemoPurchases() {
  const [data, setData] = useState<Purchase[]>(loadInitialData);

  function save(next: Purchase[]) {
    setData(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function create(values: PurchaseFormValues) {
    toast.success("Data pembelian berhasil ditambah");

    const isoNow = new Date().toISOString();

    const purchaseId = generateDemoId("purchase");
    const purchaseCode = generateDemoId("DEMO");

    // 1️⃣ PURCHASE (HEADER)
    const newPurchase: Purchase = {
      id: purchaseId,
      purchase_code: purchaseCode,
      purchase_date: values.purchase_date
        ? values.purchase_date.toISOString()
        : isoNow,
      supplier_name: values.supplier_name ?? null,
      supplier_type: values.supplier_type ?? null,
      notes: values.notes ?? null,
      created_at: isoNow,
      deleted_at: null,
    };

    // 2️⃣ PURCHASE ITEMS
    const items = values.items.map((item, index) => ({
      id: `demo-item-${isoNow}-${index}`,
      purchase_id: purchaseId,
      product_id: item.product_id,
      name: getProductName(item.product_id),
      unit: "pcs",
      quantity: item.quantity,
      remaining_quantity: item.quantity,
      price: item.price,
      hpp: item.price / item.quantity,
    }));

    // 3️⃣ SAVE
    save([newPurchase, ...data]);

    const existingItems = loadItems();
    saveItems([...existingItems, ...items]);
  }

  function update(id: string, values: PurchaseFormValues) {
    toast.success("Data pembelian berhasil diperbarui");

    /** 1️⃣ UPDATE PURCHASE HEADER */
    const nextPurchases = data.map((p) =>
      p.id === id
        ? {
            ...p,
            purchase_date: values.purchase_date
              ? values.purchase_date.toISOString()
              : p.purchase_date,
            supplier_name: values.supplier_name ?? null,
            supplier_type: values.supplier_type ?? null,
            notes: values.notes ?? null,
          }
        : p
    );

    save(nextPurchases);

    /** 2️⃣ HAPUS ITEM LAMA */
    const existingItems = loadItems();
    const remainingItems = existingItems.filter(
      (item) => item.purchase_id !== id
    );

    /** 3️⃣ INSERT ITEM BARU */
    const newItems = values.items.map((item) => ({
      id: generateDemoId("demo-item"),
      purchase_id: id,
      product_id: item.product_id,
      name: getProductName(item.product_id),
      unit: "pcs", // atau ambil dari demo products
      quantity: item.quantity,
      remaining_quantity: item.quantity,
      price: item.price,
      hpp: item.price / item.quantity,
    }));

    saveItems([...remainingItems, ...newItems]);
  }

  function remove(id: string) {
    toast.success("Data pembelian berhasil dihapus");
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

  function getItemsByPurchaseId(purchaseId: string) {
    return loadItems().filter((i) => i.purchase_id === purchaseId);
  }

  return {
    data,
    isLoading: false,
    create,
    update,
    remove,
    getProductName,
    getItemsByPurchaseId,
  };
}
