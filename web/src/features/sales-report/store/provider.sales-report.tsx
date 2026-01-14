import { SERVER_URL } from "@/constants/url";
import { buildUrl } from "@/utils/build-url";
import { endOfDay, startOfDay } from "date-fns";
import React, { createContext, useContext, useState } from "react";
import { KeyedMutator } from "swr";
import { SalesReportQuery } from "../types/query.report-sales";
import { ReportSalesApiReturn } from "../types/api.report-sales";
import { useFetch } from "@/hooks/use-fetch";

interface SalesReportContextTypes {
  query: SalesReportQuery;
  updateQuery: <T extends keyof SalesReportQuery>(
    key: T,
    value: SalesReportQuery[T]
  ) => void;
  resetQuery: () => void;

  data: ReportSalesApiReturn | undefined;
  error: Error;
  isLoading: boolean;
  mutate: KeyedMutator<ReportSalesApiReturn>;
}

const SalesReportContext = createContext<SalesReportContextTypes>(
  {} as SalesReportContextTypes
);

const defaultQuery: SalesReportQuery = {
  limit: 10,
  page: 1,
  from: startOfDay(new Date()),
  to: endOfDay(new Date()),
  filters: [],
  mode: "full",
  content: "summary",
};

export function SalesReportProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [query, setQuery] = useState<SalesReportQuery>(defaultQuery);

  const url = buildUrl<SalesReportQuery>(SERVER_URL, "/sales/report", query);
  const fetcher = useFetch<ReportSalesApiReturn>(url);

  const resetQuery = () => {
    setQuery(defaultQuery);
  };

  const updateQuery = <T extends keyof SalesReportQuery>(
    key: T,
    value: SalesReportQuery[T]
  ) => {
    setQuery((prev) => ({ ...prev, [key]: value }));
  };

  const values: SalesReportContextTypes = {
    query,
    resetQuery,
    updateQuery,

    ...fetcher,
  };
  return (
    <SalesReportContext.Provider value={values}>
      {children}
    </SalesReportContext.Provider>
  );
}

export const useSalesReport = () => useContext(SalesReportContext);
