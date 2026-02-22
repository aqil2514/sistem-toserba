import { KeyedMutator } from "swr";
import React, { createContext, useContext, useMemo } from "react";
import { useFetch } from "@/hooks/use-fetch";
import { SERVER_URL } from "@/constants/url";
import { startOfDay, startOfMonth } from "date-fns";
import { buildUrlBasicQuery } from "@/utils/url-builder/build-url-basic-query";
import { CashflowReportMovementQuery } from "../types/cashflow-report-query.types";
import { CashflowReportMovement } from "../types/api-return.types";
import { useQueryCashflowReportMovement } from "../hooks/use-query-cashflow-report-movement";

interface CashflowReportdMovementContextType {
  data: CashflowReportMovement;
  error: Error;
  isLoading: boolean;
  mutate: KeyedMutator<CashflowReportMovement>;

  query: CashflowReportMovementQuery;
}

const CashflowReportdMovementContext =
  createContext<CashflowReportdMovementContextType>(
    {} as CashflowReportdMovementContextType,
  );

const defaultQuery: CashflowReportMovementQuery = {
  limit: 20,
  page: 1,
  filters: [],
  mode: "movement-global",
  from: startOfMonth(startOfDay(new Date())),
  to: startOfDay(new Date()),
  sort: [
    {
      key: "transaction_at",
      value: "desc",
    },
  ],
};

export function CashflowReportdMovementProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { query } = useQueryCashflowReportMovement(defaultQuery);

  const serverUrl = useMemo<string>(
    () =>
      buildUrlBasicQuery({
        endpoint: "cashflow/report/movement",
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
  } = useFetch<CashflowReportMovement>(serverUrl);

  const data = useMemo<CashflowReportMovement>(() => {
    return rawData ?? { data: [], type: "movement-global" };
  }, [rawData]);

  const values: CashflowReportdMovementContextType = {
    data,
    error,
    isLoading,
    mutate,

    query,
  };
  return (
    <CashflowReportdMovementContext.Provider value={values}>
      {children}
    </CashflowReportdMovementContext.Provider>
  );
}

export const useCashflowReportMovement = () =>
  useContext(CashflowReportdMovementContext);
