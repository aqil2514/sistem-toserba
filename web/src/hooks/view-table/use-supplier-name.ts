import { LabelValue } from "@/@types/general";
import { SERVER_URL } from "@/constants/url";
import { useFetch } from "@/hooks/use-fetch";
import { useMemo } from "react";

export function useSupplierName() {
  const { data, isLoading } = useFetch<string[]>(
    `${SERVER_URL}/purchase/fetcher/supplier-name`,
  );

  const supplierName = useMemo<string[]>(() => {
    if (!data) return [];
    return data;
  }, [data]);

  const supplierNameLabelValue = useMemo<LabelValue<string>[]>(() => {
    if (!data) return [];

    return data.map((d) => ({
      label: d,
      value: d,
    }));
  }, [data]);

  return { supplierName, supplierNameLabelValue, isLoading };
}
