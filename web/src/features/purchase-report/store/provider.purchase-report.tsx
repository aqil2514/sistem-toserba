import React, { createContext, useContext, useState } from "react";
import { PurchaseReportQuery } from "../types/query.purchase-report";
import { endOfDay, startOfDay } from "date-fns";
import { buildUrl } from "@/utils/build-url";
import { SERVER_URL } from "@/constants/url";
import { useFetch } from "@/hooks/use-fetch";
import { PurchaseReportApiResponse } from "../types/api-response.purchase-report";
import { KeyedMutator } from "swr";

interface PurchaseReportContextType {
  query: PurchaseReportQuery;
  updateQuery: <T extends keyof PurchaseReportQuery>(
    key: T,
    value: PurchaseReportQuery[T],
  ) => void;
  resetQuery: () => void;

  data: PurchaseReportApiResponse | undefined;
  error: Error;
  isLoading: boolean;
  mutate: KeyedMutator<PurchaseReportApiResponse>;
}

const PurchaseReportContext = createContext<PurchaseReportContextType>(
  {} as PurchaseReportContextType,
);

const defaultQuery: PurchaseReportQuery = {
  limit: 10,
  content: "summary",
  page: 1,
  from: startOfDay(new Date()),
  to: endOfDay(new Date()),
  filters: [],
  sort: [],
};

export function PurchaseReportProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [query, setQuery] = useState<PurchaseReportQuery>(defaultQuery);

  // >>>>>> FETCHER AREA <<<<<<
  const url = buildUrl<PurchaseReportQuery>(
    SERVER_URL,
    "/purchase/report",
    query,
  );
  const fetcher = useFetch<PurchaseReportApiResponse>(url);

  console.log(fetcher);

  //   >>>>>> QUERY AREA <<<<<<

  const updateQuery = <T extends keyof PurchaseReportQuery>(
    key: T,
    value: PurchaseReportQuery[T],
  ) => setQuery((prev) => ({ ...prev, [key]: value }));

  const resetQuery = () => setQuery(defaultQuery);

  const values: PurchaseReportContextType = {
    query,
    updateQuery,
    resetQuery,

    ...fetcher
  };
  return (
    <PurchaseReportContext.Provider value={values}>
      {children}
    </PurchaseReportContext.Provider>
  );
}

export const usePurchaseReport = () => useContext(PurchaseReportContext);
