"use client";

import { PurchaseTemplate } from "../purchase.template";
import { usePurchases } from "../hooks/use-purchases";
import { useProducts } from "../../products/hooks/use-products";

export function PurchasesContainer() {
  const purchases = usePurchases();
  const products = useProducts();

  return (
    <PurchaseTemplate
      mode="private"
      data={purchases.data}
      products={products.data}
      isLoading={purchases.isLoading || products.isLoading}
      error={purchases.error || products.error}
      onCreate={purchases.create}
      onDelete={purchases.remove}
      onUpdate={purchases.update}
    />
  );
}
