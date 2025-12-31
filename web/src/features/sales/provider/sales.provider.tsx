/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { SERVER_URL } from "@/constants/url";
import { useFetch } from "@/hooks/use-fetch";
import React, { createContext, useContext, useState } from "react";
import { SalesQuery } from "../types/query";
import { defaultQuery } from "../constants/default-query";
import { KeyedMutator } from "swr";
import { SalesHeaderQueryResponse } from "../types/sales-header-api";
import { buildUrl } from "@/utils/build-url";

interface SalesContextType {
  query: SalesQuery;
  updateQuery: <T extends keyof SalesQuery>(
    key: T,
    value: SalesQuery[T]
  ) => void;
  resetQuery: () => void;

  detailSalesId: string;
  setDetailSalesId: React.Dispatch<React.SetStateAction<string>>;

  mode: "private" | "demo";

  isLoading: boolean;
  data: SalesHeaderQueryResponse | undefined;
  error?: any;
  mutate?: KeyedMutator<SalesHeaderQueryResponse>;
}

const SalesContext = createContext<SalesContextType>({} as SalesContextType);

export function SalesProvider({
  children,
  mode,
}: {
  children: React.ReactNode;
  mode: "private" | "demo";
}) {
  const [query, setQuery] = useState<SalesQuery>(defaultQuery);
  const [detailSalesId, setDetailSalesId] = useState<string>("");

  const updateQuery = <T extends keyof SalesQuery>(
    key: T,
    value: SalesQuery[T]
  ) => {
    setQuery((prev) => ({ ...prev, [key]: value }));
  };

  const resetQuery = () => setQuery(defaultQuery);

  const url = buildUrl<SalesQuery>(SERVER_URL, "sales", {
    page: query.page,
    limit: query.limit,
    from: query?.from,
    to: query?.to,
    toggleColumnKey: query.toggleColumnKey,
    toggleColumnValue: query.toggleColumnValue,
    sortedKey: query.sortedKey,
    sortedValue: query.sortedValue,
  });

  const fetcher = useFetch<SalesHeaderQueryResponse>(url);

  const data = mode === "private" ? fetcher.data : undefined;
  const isLoading = mode === "private" ? fetcher.isLoading : false;

  const values: SalesContextType = {
    query,
    updateQuery,
    resetQuery,

    detailSalesId,
    setDetailSalesId,

    mode,

    data,
    isLoading,
    error: mode === "private" ? fetcher.error : undefined,
    mutate: mode === "private" ? fetcher.mutate : undefined,
  };
  return (
    <SalesContext.Provider value={values}>{children}</SalesContext.Provider>
  );
}

export const useSales = () => useContext(SalesContext);
