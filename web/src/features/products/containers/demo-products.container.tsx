"use client";

import { ProductTemplate } from "../products.template";
import { useDemoProducts } from "../hooks/use-demo-products";

export function DemoProductsContainer() {
  const demo = useDemoProducts();

  return (
    <ProductTemplate
      mode="demo"
      data={demo.data}
      onCreate={demo.create}
      onUpdate={demo.update}
      onDelete={demo.remove}
    />
  );
}
