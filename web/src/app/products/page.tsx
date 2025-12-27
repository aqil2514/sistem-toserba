import { ProductTemplate } from "@/features/products/products.template";
import { getMe } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProductPage() {
  const user = await getMe();

  if (!user) redirect("/");

  return <ProductTemplate />;
}
