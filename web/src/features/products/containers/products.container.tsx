"use client";

import { ProductTemplate } from "../products.template";
import { useProducts } from "../hooks/use-products";

export function ProductsContainer() {
  const {
    data,
    isLoading,
    error,
    create,
    update,
    remove,
  } = useProducts();

  return (
    <ProductTemplate
      mode="private"
      data={data}
      isLoading={isLoading}
      error={error}
      onCreate={create}
      onUpdate={update}
      onDelete={remove}
    />
  );
}
