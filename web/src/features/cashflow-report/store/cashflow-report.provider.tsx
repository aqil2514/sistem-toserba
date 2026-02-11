import { KeyedMutator } from "swr";
import { CashflowReportAPiReturn } from "../types/api-return.types";
import { CashflowReportQuery } from "../types/cashflow-report-query.types";
import { startOfDay, startOfMonth } from "date-fns";
import { createContext, useContext, useState } from "react";
import { buildUrl } from "@/utils/build-url";
import { SERVER_URL } from "@/constants/url";
import { useFetch } from "@/hooks/use-fetch";

interface CashflowReportContextType {
  query: CashflowReportQuery;
  updateQuery: <T extends keyof CashflowReportQuery>(
    key: T,
    value: CashflowReportQuery[T],
  ) => void;
  resetQuery: () => void;

  data: CashflowReportAPiReturn | undefined;
  error: Error;
  isLoading: boolean;
  mutate: KeyedMutator<CashflowReportAPiReturn>;
}

const CashflowReportContext = createContext<CashflowReportContextType>(
  {} as CashflowReportContextType,
);

const defaultQuery: CashflowReportQuery = {
  limit: 50,
  content: "breakdown",
  page: 1,
  from: startOfMonth(startOfDay(new Date())),
  to: startOfDay(new Date()),
  filters: [],
  sort: [],
};

export function CashflowReportProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [query, setQuery] = useState<CashflowReportQuery>(defaultQuery);

  // >>>>>> FETCHER AREA <<<<<<
  const url = buildUrl<CashflowReportQuery>(
    SERVER_URL,
    "/cashflow/report",
    query,
  );
  const fetcher = useFetch<CashflowReportAPiReturn>(url);

  //   >>>>>> QUERY AREA <<<<<<

  const updateQuery = <T extends keyof CashflowReportQuery>(
    key: T,
    value: CashflowReportQuery[T],
  ) => setQuery((prev) => ({ ...prev, [key]: value }));

  const resetQuery = () => setQuery(defaultQuery);

  const values: CashflowReportContextType = {
    query,
    updateQuery,
    resetQuery,

    ...fetcher,
  };
  return (
    <CashflowReportContext.Provider value={values}>
      {children}
    </CashflowReportContext.Provider>
  );
}

export const useCashflowReport = () => useContext(CashflowReportContext);
