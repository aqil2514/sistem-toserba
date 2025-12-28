"use client";

import { PurchaseTemplate } from "../purchase.template";
import { useDemoPurchases } from "../hooks/use-demo-purchases";
import { useDemoProducts } from "../../products/hooks/use-demo-products";

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
    />
  );
}
