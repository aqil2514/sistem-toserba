"use client";
import { SERVER_URL } from "@/constants/url";
import { useFetch } from "@/hooks/use-fetch";
import React, { createContext, useContext, useMemo } from "react";
import { KeyedMutator } from "swr";
import { BasicQuery, DataQueryResponse } from "@/@types/general";
import { buildUrlBasicQuery } from "@/utils/url-builder/build-url-basic-query";
import { useQueryBasics } from "@/hooks/use-query-basics";
import { defaultQuery } from "../constants/default-query.sales";
import { SalesHeader } from "../types/sales-header";

interface SalesContextType {
  query: BasicQuery;

  isLoading: boolean;
  data: DataQueryResponse<SalesHeader[]> | undefined;
  error?: Error;
  mutate?: KeyedMutator<DataQueryResponse<SalesHeader[]>>;
}

const SalesContext = createContext<SalesContextType>({} as SalesContextType);

export function SalesProvider({ children }: { children: React.ReactNode }) {
  const { query } = useQueryBasics(defaultQuery);

  const serverUrl = useMemo<string>(
    () =>
      buildUrlBasicQuery({
        endpoint: "/sales",
        base: SERVER_URL,
        rawQuery: query,
      }),
    [query],
  );
  const fetcher = useFetch<DataQueryResponse<SalesHeader[]>>(serverUrl);

  const values: SalesContextType = {
    query,

    ...fetcher,
  };
  return (
    <SalesContext.Provider value={values}>{children}</SalesContext.Provider>
  );
}

export const useSales = () => useContext(SalesContext);
