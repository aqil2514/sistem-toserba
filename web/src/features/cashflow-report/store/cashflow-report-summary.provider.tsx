import { KeyedMutator } from "swr";
import { DailyCashflowSummaryRow } from "../types/api-return.types";
import React, { createContext, useContext, useMemo } from "react";
import { useFetch } from "@/hooks/use-fetch";
import { SERVER_URL } from "@/constants/url";
import { BasicQuery } from "@/@types/general";
import { startOfDay, startOfMonth } from "date-fns";
import { useQueryBasics } from "@/hooks/use-query-basics";
import { buildUrlBasicQuery } from "@/utils/url-builder/build-url-basic-query";

interface CashflowReportSummaryContextType {
  data: DailyCashflowSummaryRow[];
  error: Error;
  isLoading: boolean;
  mutate: KeyedMutator<DailyCashflowSummaryRow[]>;
}

const CashflowReportSummaryContext =
  createContext<CashflowReportSummaryContextType>(
    {} as CashflowReportSummaryContextType,
  );

const defaultQuery: BasicQuery = {
  limit: 50,
  page: 1,
  filters: [],
  from: startOfMonth(startOfDay(new Date())),
  to: startOfDay(new Date()),
  sort: [],
};

export function CashflowReportSummaryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { query } = useQueryBasics(defaultQuery);

  const serverUrl = useMemo<string>(
    () =>
      buildUrlBasicQuery({
        endpoint: "cashflow/report/summary",
        base: SERVER_URL,
        rawQuery: query,
      }),
    [query],
  );

  const {
    data: rawData,
    error,
    isLoading,
    mutate,
  } = useFetch<DailyCashflowSummaryRow[]>(serverUrl);

  const data = useMemo(() => {
    if (!rawData) return [];

    return rawData;
  }, [rawData]);

  const values: CashflowReportSummaryContextType = {
    data,
    error,
    isLoading,
    mutate,
  };
  return (
    <CashflowReportSummaryContext.Provider value={values}>
      {children}
    </CashflowReportSummaryContext.Provider>
  );
}

export const useCashflowReportSummary = () => useContext(CashflowReportSummaryContext)