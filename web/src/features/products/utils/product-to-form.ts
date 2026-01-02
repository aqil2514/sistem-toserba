import { Product } from "../types/type";
import { ProductFormValues } from "../schema/product.schema";

export function productToFormValues(
  product: Product
): ProductFormValues {
  return {
    name: product.name,
    price: product.price,
    category: product.category,
    unit: product.unit,
    subcategory: product.subcategory ?? undefined,
  };
}
