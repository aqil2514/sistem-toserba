"use client";

import { useState } from "react";
import { Product } from "../type";
import { DEMO_PRODUCTS } from "../data/demo-products";

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
  }

  function update(id: string, values: Partial<Product>) {
    save(
      data.map((p) =>
        p.id === id
          ? { ...p, ...values, updated_at: new Date().toISOString() }
          : p
      )
    );
  }

  function remove(id: string) {
    save(data.filter((p) => p.id !== id));
  }

  return {
    data,
    isLoading: false, // demo load instan
    create,
    update,
    remove,
  };
}
