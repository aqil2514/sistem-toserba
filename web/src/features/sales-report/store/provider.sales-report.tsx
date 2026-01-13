import { DataQueryResponse } from "@/@types/general";
import { SERVER_URL } from "@/constants/url";
import { buildUrl } from "@/utils/build-url";
import { endOfDay, startOfDay } from "date-fns";
import React, { createContext, useContext, useState } from "react";
import { KeyedMutator } from "swr";
import { SalesReportQuery } from "../types/query.report-sales";
import { ReportMode, ReportResponseMap, useFetchDb } from "../hooks/useFetchDb";

interface SalesReportContextTypes<M extends ReportMode> {
  query: SalesReportQuery;
  updateQuery: <T extends keyof SalesReportQuery>(
    key: T,
    value: SalesReportQuery[T]
  ) => void;
  resetQuery: () => void;

  data: DataQueryResponse<ReportResponseMap[M]> | undefined;
  error: Error;
  isLoading: boolean;
  mutate: KeyedMutator<DataQueryResponse<ReportResponseMap[M]>>;
}

const SalesReportContext = createContext<SalesReportContextTypes<ReportMode>>(
  {} as SalesReportContextTypes<ReportMode>
);

const defaultQuery: SalesReportQuery = {
  limit: 10,
  page: 1,
  from: startOfDay(new Date()),
  to: endOfDay(new Date()),
  filters: [],
  mode: "full",
};

export function SalesReportProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [query, setQuery] = useState<SalesReportQuery>(defaultQuery);

  const url = buildUrl<SalesReportQuery>(SERVER_URL, "/sales/report", query);
  const fetcher = useFetchDb(query.mode, url);

  const resetQuery = () => {
    setQuery(defaultQuery);
  };

  const updateQuery = <T extends keyof SalesReportQuery>(
    key: T,
    value: SalesReportQuery[T]
  ) => {
    setQuery((prev) => ({ ...prev, [key]: value }));
  };

  const values: SalesReportContextTypes<ReportMode> = {
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
