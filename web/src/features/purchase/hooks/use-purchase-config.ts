import { SERVER_URL } from "@/constants/url";
import { useFetch } from "@/hooks/use-fetch";

export function usePurchaseConfig() {
  const supplierNameFetcher = useFetch<string[]>(
    `${SERVER_URL}/purchase/fetcher/supplier-name`,
  );
  const supplierTypeFetcher = useFetch<string[]>(
    `${SERVER_URL}/purchase/fetcher/supplier-type`,
  );
  const productNameFetcher = useFetch<{ id: string; name: string }[]>(
    `${SERVER_URL}/purchase/fetcher/products`,
  );

  return {
    supplierName: supplierNameFetcher.data?.sort() ?? [],
    supplierType: supplierTypeFetcher.data?.sort() ?? [],
    productNameFetcher,
  };
}
