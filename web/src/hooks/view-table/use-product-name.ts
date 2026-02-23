import { LabelValue } from "@/@types/general";
import { SERVER_URL } from "@/constants/url";
import { useFetch } from "@/hooks/use-fetch";
import { useMemo } from "react";

export function useProductName() {
  const { data, isLoading, mutate } = useFetch<{ id: string; name: string }[]>(
    `${SERVER_URL}/products`,
  );

  const productName = useMemo<{ id: string; name: string }[]>(() => {
    if (!data) return [];
    return data;
  }, [data]);

  const productNameLabelValue = useMemo<LabelValue<string>[]>(() => {
    if (!data) return [];

    return data.map((d) => ({
      label: d.name,
      value: d.id,
    }));
  }, [data]);

  return { productName, isLoading, productNameLabelValue, mutate };
}
