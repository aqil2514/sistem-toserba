import ProductTemplate from "@/features/products/products.template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produk",
};

export default async function ProductPage() {
  return <ProductTemplate mode="private" />;
}
