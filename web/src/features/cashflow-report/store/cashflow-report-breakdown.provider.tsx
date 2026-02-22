import { KeyedMutator } from "swr";
import { CashflowBreakdownRpc } from "../types/api-return.types";
import React, { createContext, useContext, useMemo } from "react";
import { useFetch } from "@/hooks/use-fetch";
import { SERVER_URL } from "@/constants/url";
import { BasicQuery, DataQueryResponse } from "@/@types/general";
import { startOfDay, startOfMonth } from "date-fns";
import { useQueryBasics } from "@/hooks/use-query-basics";
import { buildUrlBasicQuery } from "@/utils/url-builder/build-url-basic-query";
import { defaultMetaResponse } from "@/constants/default-meta-response";

interface CashflowReportBreakdownContextType {
  data: DataQueryResponse<CashflowBreakdownRpc[]>;
  error: Error;
  isLoading: boolean;
  mutate: KeyedMutator<DataQueryResponse<CashflowBreakdownRpc[]>>;

  query: BasicQuery;
}

const CashflowReportBreakdownContext =
  createContext<CashflowReportBreakdownContextType>(
    {} as CashflowReportBreakdownContextType,
  );

const defaultQuery: BasicQuery = {
  limit: 20,
  page: 1,
  filters: [],
  from: startOfMonth(startOfDay(new Date())),
  to: startOfDay(new Date()),
  sort: [{
    key:"transaction_at",
    value:"desc"
  }],
};

export function CashflowReportBreakdownProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { query } = useQueryBasics(defaultQuery);

  const serverUrl = useMemo<string>(
    () =>
      buildUrlBasicQuery({
        endpoint: "cashflow/report/breakdown",
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
  } = useFetch<DataQueryResponse<CashflowBreakdownRpc[]>>(serverUrl);

  const data = useMemo<DataQueryResponse<CashflowBreakdownRpc[]>>(() => {
    return rawData ?? { data: [], meta: defaultMetaResponse };
  }, [rawData]);

  const values: CashflowReportBreakdownContextType = {
    data,
    error,
    isLoading,
    mutate,

    query
  };
  return (
    <CashflowReportBreakdownContext.Provider value={values}>
      {children}
    </CashflowReportBreakdownContext.Provider>
  );
}

export const useCashflowReportBreakdown = () =>
  useContext(CashflowReportBreakdownContext);
