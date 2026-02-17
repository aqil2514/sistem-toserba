import { SERVER_URL } from "@/constants/url";
import { useFetch } from "@/hooks/use-fetch";

export function usePurchaseConfig() {
  const supplierNameFetcher = useFetch<string[]>(
    `${SERVER_URL}/purchase/fetcher/supplier-name`,
  );
  const supplierTypeFetcher = useFetch<string[]>(
    `${SERVER_URL}/purchase/fetcher/supplier-type`,
  );

  return {
    supplierName: supplierNameFetcher.data ?? [],
    supplierType: supplierTypeFetcher.data ??[],
  };
}
