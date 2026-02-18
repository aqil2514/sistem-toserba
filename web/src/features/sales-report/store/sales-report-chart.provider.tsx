import { KeyedMutator } from "swr";
import React, { createContext, useContext, useMemo } from "react";
import { useFetch } from "@/hooks/use-fetch";
import { SERVER_URL } from "@/constants/url";
import { startOfDay } from "date-fns";
import { buildUrlBasicQuery } from "@/utils/url-builder/build-url-basic-query";
import { SalesReportChartQuery } from "../types/query.report-sales";
import { useSalesReportChartQuery } from "../hooks/use-sales-report-chart-query";
import { SalesReportChartReturn } from "../types/chart.report-sales-type";

interface SalesReportChartContextType {
  data: SalesReportChartReturn | undefined;
  error: Error;
  isLoading: boolean;
  mutate: KeyedMutator<SalesReportChartReturn>;

  query: SalesReportChartQuery;
}

const SalesReportChartContext = createContext<SalesReportChartContextType>(
  {} as SalesReportChartContextType,
);

const defaultQuery: SalesReportChartQuery = {
  limit: 10,
  page: 1,
  from: startOfDay(new Date()),
  to: new Date(),
  filters: [],
  mode: "breakdown",
  groupBy: "day",
};

export function SalesReportChartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { query } = useSalesReportChartQuery(defaultQuery);

  // >>>>>> FETCHER AREA <<<<<<
  const serverUrl = useMemo<string>(
    () =>
      buildUrlBasicQuery({
        endpoint: "/sales/report/chart",
        base: SERVER_URL,
        rawQuery: query,
      }),
    [query],
  );

  const fetcher = useFetch<SalesReportChartReturn>(serverUrl);

  const values: SalesReportChartContextType = {
    ...fetcher,

    query,
  };

  return (
    <SalesReportChartContext.Provider value={values}>
      {children}
    </SalesReportChartContext.Provider>
  );
}

export const useSalesReportChart = () => useContext(SalesReportChartContext);
