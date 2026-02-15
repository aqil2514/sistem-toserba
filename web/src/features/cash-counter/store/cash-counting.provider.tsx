import { KeyedMutator } from "swr";
import React, { createContext, useContext, useMemo } from "react";
import { useFetch } from "@/hooks/use-fetch";
import { BasicQuery } from "@/@types/general";
import { CashCountsReturnApi } from "../types/type.cash-counter-cash-counting";
import { SERVER_URL } from "@/constants/url";
import { startOfDay, startOfMonth } from "date-fns";
import { buildUrlBasicQuery } from "@/utils/url-builder/build-url-basic-query";
import { useQueryBasics } from "@/hooks/use-query-basics";

interface CashCountingContextType {
  data: CashCountsReturnApi | undefined;
  error: Error;
  isLoading: boolean;
  mutate: KeyedMutator<CashCountsReturnApi>;

  query: BasicQuery;
}

const CashCountingContext = createContext<CashCountingContextType>(
  {} as CashCountingContextType,
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

export function CashCountingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { query } = useQueryBasics(defaultQuery);

  // >>>>>> FETCHER AREA <<<<<<
  const serverUrl = useMemo<string>(
    () =>
      buildUrlBasicQuery({
        endpoint: "/cash-counter/cash-counting",
        base: SERVER_URL,
        rawQuery: query,
      }),
    [query],
  );
  
  const fetcher = useFetch<CashCountsReturnApi>(serverUrl);

  const values: CashCountingContextType = {
    ...fetcher,

    query,
  };

  return (
    <CashCountingContext.Provider value={values}>
      {children}
    </CashCountingContext.Provider>
  );
}

export const useCashCounts = () => useContext(CashCountingContext);
