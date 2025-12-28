import { useFetch } from "@/hooks/use-fetch";
import { Product } from "../type";
import { SERVER_URL } from "@/constants/url";

export function useProducts() {
  return useFetch<Product[]>(`${SERVER_URL}/products`);
}
