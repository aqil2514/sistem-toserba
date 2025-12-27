import { useFetch } from "@/hooks/use-fetch";
import { Product } from "../type";

export function useProducts() {
  return useFetch<Product[]>("http://localhost:3001/products");
}
