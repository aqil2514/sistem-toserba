import { Product } from "@/features/products/types/type";
import { SalesHeader } from "../types/sales-header";

export function isSalesHeader(
  value?: string | SalesHeader
): value is SalesHeader {
  return typeof value === "object" && value !== null;
}

export function isProduct(value?: string | Product): value is Product {
  return typeof value === "object" && value !== null;
}
