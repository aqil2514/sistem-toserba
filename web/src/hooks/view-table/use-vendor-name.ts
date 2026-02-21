import { SERVER_URL } from "@/constants/url";
import { useFetch } from "@/hooks/use-fetch";
import { useMemo } from "react";

export function useVendorName() {
  const { data, isLoading } = useFetch<string[]>(`${SERVER_URL}/cashflow/vendor_name`);

  const vendorName = useMemo<string[]>(() => {
    if (!data) return [];
    return data;
  }, [data]);

  return { vendorName, isLoading };
}
