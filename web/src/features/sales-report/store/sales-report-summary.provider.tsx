import { KeyedMutator } from "swr";
import React, { createContext, useContext, useMemo } from "react";
import { useFetch } from "@/hooks/use-fetch";
import { BasicQuery } from "@/@types/general";
import { SERVER_URL } from "@/constants/url";
import { startOfDay } from "date-fns";
import { buildUrlBasicQuery } from "@/utils/url-builder/build-url-basic-query";
import { useQueryBasics } from "@/hooks/use-query-basics";
import { SalesReportSummaryRpcReturn } from "../types/api-return.report-sales";

interface SalesReportSummaryContext {
  data: SalesReportSummaryRpcReturn | undefined;
  error: Error;
  isLoading: boolean;
  mutate: KeyedMutator<SalesReportSummaryRpcReturn>;

  query: BasicQuery;
}

const SalesSummaryReportContext = createContext<SalesReportSummaryContext>(
  {} as SalesReportSummaryContext,
);

const defaultQuery: BasicQuery = {
  limit: 10,
  page: 1,
  from: startOfDay(new Date()),
  to: new Date(),
  filters: [],
};

export function SalesSummaryReportProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { query } = useQueryBasics(defaultQuery);

  // >>>>>> FETCHER AREA <<<<<<
  const serverUrl = useMemo<string>(
    () =>
      buildUrlBasicQuery({
        endpoint: "/sales/report/summary",
        base: SERVER_URL,
        rawQuery: query,
      }),
    [query],
  );

  const fetcher = useFetch<SalesReportSummaryRpcReturn>(serverUrl);

  const values: SalesReportSummaryContext = {
    ...fetcher,

    query,
  };

  return (
    <SalesSummaryReportContext.Provider value={values}>
      {children}
    </SalesSummaryReportContext.Provider>
  );
}

export const useSalesReportSummary = () =>
  useContext(SalesSummaryReportContext);
