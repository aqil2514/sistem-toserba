import { KeyedMutator } from "swr";
import { Purchase } from "../types/purchase";
import React, { createContext, useContext, useMemo } from "react";
import { useFetch } from "@/hooks/use-fetch";
import { SERVER_URL } from "@/constants/url";
import { defaultQuery } from "../constants/default-query.purchase";
import { BasicQuery, DataQueryResponse } from "@/@types/general";
import { useQueryBasics } from "@/hooks/use-query-basics";
import { buildUrlBasicQuery } from "@/utils/url-builder/build-url-basic-query";

interface PurchaseContextType {
  query: BasicQuery;

  isLoading: boolean;
  data: DataQueryResponse<Purchase[]> | undefined;
  error?: Error;
  mutate?: KeyedMutator<DataQueryResponse<Purchase[]>>;
}

const PurchaseContext = createContext<PurchaseContextType>(
  {} as PurchaseContextType,
);

export function PurchaseProvider({ children }: { children: React.ReactNode }) {
  const { query } = useQueryBasics(defaultQuery);

  const serverUrl = useMemo<string>(
    () =>
      buildUrlBasicQuery({
        endpoint: "/purchase",
        base: SERVER_URL,
        rawQuery: query,
      }),
    [query],
  );

  const fetcher = useFetch<DataQueryResponse<Purchase[]>>(serverUrl);

  const values: PurchaseContextType = {
    ...fetcher,
    query,
  };

  return (
    <PurchaseContext.Provider value={values}>
      {children}
    </PurchaseContext.Provider>
  );
}

export const usePurchase = () => useContext(PurchaseContext);
