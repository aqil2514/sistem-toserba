import { BasicQuery, DataQueryResponse } from "@/@types/general";
import { SERVER_URL } from "@/constants/url";
import { SalesItemApiResponse } from "@/features/sales/types/sales-item-api";
import { useFetch } from "@/hooks/use-fetch";
import { buildUrl } from "@/utils/build-url";
import { endOfDay, startOfDay } from "date-fns";
import React, { createContext, useContext, useState } from "react";
import { KeyedMutator } from "swr";

interface SalesReportContextTypes {
  query: BasicQuery;
  updateQuery: <T extends keyof BasicQuery>(
    key: T,
    value: BasicQuery[T]
  ) => void;
  resetQuery: () => void;

  data: DataQueryResponse<SalesItemApiResponse[]> | undefined;
  error: Error;
  isLoading: boolean;
  mutate: KeyedMutator<DataQueryResponse<SalesItemApiResponse[]>>;

  isSummarizedData: boolean;
  setIsSummarizedData: React.Dispatch<React.SetStateAction<boolean>>;
}

const SalesReportContext = createContext<SalesReportContextTypes>(
  {} as SalesReportContextTypes
);

const defaultQuery: BasicQuery = {
  limit: 200,
  page: 1,
  from: startOfDay(new Date()),
  to: endOfDay(new Date()),
};

export function SalesReportProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [query, setQuery] = useState<BasicQuery>(defaultQuery);
  const [isSummarizedData, setIsSummarizedData] = useState<boolean>(false);

  const url = buildUrl<BasicQuery>(SERVER_URL, "/sales/report", query);
  const fetcher = useFetch<DataQueryResponse<SalesItemApiResponse[]>>(url);

  const resetQuery = () => {
    setQuery(defaultQuery);
  };

  const updateQuery = <T extends keyof BasicQuery>(
    key: T,
    value: BasicQuery[T]
  ) => {
    setQuery((prev) => ({ ...prev, [key]: value }));
  };

  const values: SalesReportContextTypes = {
    query,
    resetQuery,
    updateQuery,

    isSummarizedData,
    setIsSummarizedData,

    ...fetcher,
  };
  return (
    <SalesReportContext.Provider value={values}>
      {children}
    </SalesReportContext.Provider>
  );
}

export const useSalesReport = () => useContext(SalesReportContext);
