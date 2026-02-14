import { KeyedMutator } from "swr";
import React, { createContext, useContext, useState } from "react";
import { useFetch } from "@/hooks/use-fetch";
import { BasicQuery } from "@/@types/general";
import { buildUrl } from "@/utils/build-url";
import { SERVER_URL } from "@/constants/url";
import { startOfDay, startOfMonth } from "date-fns";
import { CashCountPivotReturn } from "../types/types.cash-counter-report";

interface CashCountingReportContextType {
  data: CashCountPivotReturn[] | undefined;
  error: Error;
  isLoading: boolean;
  mutate: KeyedMutator<CashCountPivotReturn[]>;

  query: BasicQuery;
  updateQuery: <T extends keyof BasicQuery>(
    key: T,
    value: BasicQuery[T],
  ) => void;
  resetQuery: () => void;
}

const CashCountingContext = createContext<CashCountingReportContextType>(
  {} as CashCountingReportContextType,
);

const defaultQuery: BasicQuery = {
  limit: 10,
  page: 1,
  from: startOfMonth(startOfDay(new Date())),
  to: startOfDay(new Date()),
  filters: [],
  sort: [
    {
      key: "date",
      value: "desc",
    },
  ],
};

export function CashCountingReportProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [query, setQuery] = useState<BasicQuery>(defaultQuery);

  // >>>>>> FETCHER AREA <<<<<<
  const url = buildUrl<BasicQuery>(
    SERVER_URL,
    "/cash-counter/cash-counting/report",
    query,
  );
  const fetcher = useFetch<CashCountPivotReturn[]>(url);

  //   >>>>>> QUERY AREA <<<<<<

  const updateQuery = <T extends keyof BasicQuery>(
    key: T,
    value: BasicQuery[T],
  ) => setQuery((prev) => ({ ...prev, [key]: value }));

  const resetQuery = () => setQuery(defaultQuery);

  const values: CashCountingReportContextType = {
    ...fetcher,

    query,
    resetQuery,
    updateQuery,
  };

  return (
    <CashCountingContext.Provider value={values}>
      {children}
    </CashCountingContext.Provider>
  );
}

export const useCashCountsReport = () => useContext(CashCountingContext);
