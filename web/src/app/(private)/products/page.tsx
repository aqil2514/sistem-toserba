import { ProductsContainer } from "@/features/products/containers/products.container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produk",
};

export default async function ProductPage() {
  return <ProductsContainer />;
}
