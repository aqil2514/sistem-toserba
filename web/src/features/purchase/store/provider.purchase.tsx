import { KeyedMutator } from "swr";
import { Purchase } from "../types/purchase";
import React, { createContext, useContext, useState } from "react";
import { useFetch } from "@/hooks/use-fetch";
import { SERVER_URL } from "@/constants/url";
import { PurchaseQuery } from "../types/purchase-query";
import { defaultQuery } from "../constants/default-query.purchase";
import { buildUrl } from "@/utils/build-url";
import { DataQueryResponse } from "@/@types/general";

interface PurchaseContextType {
  isLoading: boolean;
  data: DataQueryResponse<Purchase[]> | undefined;
  error?: Error;
  mutate?: KeyedMutator<DataQueryResponse<Purchase[]>>;

  query: PurchaseQuery;
  updateQuery: <T extends keyof PurchaseQuery>(
    key: T,
    value: PurchaseQuery[T],
  ) => void;
  resetQuery: () => void;
}

const PurchaseContext = createContext<PurchaseContextType>(
  {} as PurchaseContextType,
);

export function PurchaseProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState<PurchaseQuery>(defaultQuery);

  const url = buildUrl<PurchaseQuery>(SERVER_URL, "purchase", {
    page: query.page,
    limit: query.limit,
    from: query?.from,
    to: query?.to,
    filters: query?.filters,
    sort: query?.sort,
  });

  const fetcher = useFetch<DataQueryResponse<Purchase[]>>(url);

  const resetQuery = () => setQuery(defaultQuery);

  const updateQuery = <T extends keyof PurchaseQuery>(
    key: T,
    value: PurchaseQuery[T],
  ) => {
    setQuery((prev) => ({ ...prev, [key]: value }));
  };

  const values: PurchaseContextType = {
    ...fetcher,
    query,
    resetQuery,
    updateQuery,
  };

  return (
    <PurchaseContext.Provider value={values}>
      {children}
    </PurchaseContext.Provider>
  );
}

export const usePurchase = () => useContext(PurchaseContext);
