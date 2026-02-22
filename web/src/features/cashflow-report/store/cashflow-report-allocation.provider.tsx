import { KeyedMutator } from "swr";
import React, { createContext, useContext, useMemo } from "react";
import { useFetch } from "@/hooks/use-fetch";
import { SERVER_URL } from "@/constants/url";
import { BasicQuery } from "@/@types/general";
import { startOfDay, startOfMonth } from "date-fns";
import { useQueryBasics } from "@/hooks/use-query-basics";
import { buildUrlBasicQuery } from "@/utils/url-builder/build-url-basic-query";
import { CashflowAllocation } from "../types/cashflow-report-api-return.types";

interface CashflowReportAllocationContextType {
  data: CashflowAllocation[];
  error: Error;
  isLoading: boolean;
  mutate: KeyedMutator<CashflowAllocation[]>;
}

const CashflowReportAllocationContext =
  createContext<CashflowReportAllocationContextType>(
    {} as CashflowReportAllocationContextType,
  );

const defaultQuery: BasicQuery = {
  limit: 50,
  page: 1,
  filters: [],
  from: startOfMonth(startOfDay(new Date())),
  to: startOfDay(new Date()),
  sort: [],
};

export function CashflowReportAllocationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { query } = useQueryBasics(defaultQuery);

  const serverUrl = useMemo<string>(
    () =>
      buildUrlBasicQuery({
        endpoint: "cashflow/report/allocation",
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
  } = useFetch<CashflowAllocation[]>(serverUrl);

  const data = useMemo(() => {
    if (!rawData) return [];

    return rawData;
  }, [rawData]);

  const values: CashflowReportAllocationContextType = {
    data,
    error,
    isLoading,
    mutate,
  };
  return (
    <CashflowReportAllocationContext.Provider value={values}>
      {children}
    </CashflowReportAllocationContext.Provider>
  );
}

export const useCashflowReportAllocation = () => useContext(CashflowReportAllocationContext)