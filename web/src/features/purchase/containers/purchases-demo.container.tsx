"use client";
import { useDemoProducts } from "@/features/products/hooks/use-demo-products";
import { useDemoPurchases } from "../hooks/use-demo-purchases";
import { PurchaseTemplate } from "../purchase.template";

export function DemoPurchasesContainer() {
  const purchases = useDemoPurchases();
  const products = useDemoProducts();

  return (
    <PurchaseTemplate
      mode="demo"
      data={purchases.data}
      products={products.data}
      isLoading={false}
      onCreate={purchases.create}
      onDelete={purchases.remove}
      onUpdate={purchases.update}
    />
  );
}
