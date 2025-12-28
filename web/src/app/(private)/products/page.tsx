import { ProductsContainer } from "@/features/products/containers/products.container";
import { getMe } from "@/lib/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Produk",
};

export default async function ProductPage() {
  const user = await getMe();

  if (!user) redirect("/");

  return <ProductsContainer />;
}
