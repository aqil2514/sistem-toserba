"use client";

import { useState } from "react";
import { Product } from "../types/type";
import { DEMO_PRODUCTS } from "../data/demo-products";
import { toast } from "sonner";

const STORAGE_KEY = "toserba-demo-products";

function loadInitialData(): Product[] {
  if (typeof window === "undefined") return DEMO_PRODUCTS;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return DEMO_PRODUCTS;
    }
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(DEMO_PRODUCTS)
  );
  return DEMO_PRODUCTS;
}

export function useDemoProducts() {
  const [data, setData] = useState<Product[]>(loadInitialData);

  function save(next: Product[]) {
    setData(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }
  
  function create(
    values: Omit<Product, "id" | "created_at" | "updated_at">
  ) {
    const newItem: Product = {
      ...values,
      id: `demo-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    save([newItem, ...data]);
    toast.success("Tambah barang berhasil", {
      description:`Produk "${values.name}" berhasil ditambah`
    })
  }

  function update(id: string, values: Partial<Product>) {
    save(
      data.map((p) =>
        p.id === id
          ? { ...p, ...values, updated_at: new Date().toISOString() }
          : p
      )
    );
    toast.success("Barang berhasil diupdate", {
      description:`Produk "${values.name}" berhasil diupdate`
    })
  }

  function remove(id: string) {
    save(data.filter((p) => p.id !== id));
    toast.success("Barang berhasil dihapus")
  }

  return {
    data,
    isLoading: false, // demo load instan
    create,
    update,
    remove,
  };
}
