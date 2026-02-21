import { SERVER_URL } from "@/constants/url";
import { useFetch } from "@/hooks/use-fetch";
import { useMemo } from "react";

export function useCustomerName() {
  const { data, isLoading } = useFetch<string[]>(`${SERVER_URL}/sales/customer_name`);

  const customerName = useMemo<string[]>(() => {
    if (!data) return [];
    return data;
  }, [data]);

  return { customerName, isLoading };
}
