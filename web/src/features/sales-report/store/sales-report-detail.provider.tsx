import { KeyedMutator } from "swr";
import React, { createContext, useContext, useMemo } from "react";
import { useFetch } from "@/hooks/use-fetch";
import { SERVER_URL } from "@/constants/url";
import { startOfDay } from "date-fns";
import { buildUrlBasicQuery } from "@/utils/url-builder/build-url-basic-query";
import { SalesReportDetailReturn } from "../types/detail.report-sales-type";
import { SalesReportDetailQuery } from "../types/query.report-sales";
import { useSalesReportDetailQuery } from "../hooks/use-sales-report-detail-query";

interface SalesReportDetailContext {
  data: SalesReportDetailReturn | undefined;
  error: Error;
  isLoading: boolean;
  mutate: KeyedMutator<SalesReportDetailReturn>;

  query: SalesReportDetailQuery;
}

const SalesDetailReportContext = createContext<SalesReportDetailContext>(
  {} as SalesReportDetailContext,
);

const defaultQuery: SalesReportDetailQuery = {
  limit: 10,
  page: 1,
  from: startOfDay(new Date()),
  to: new Date(),
  filters: [],
  mode:"full"
};

export function SalesDetailReportProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { query } = useSalesReportDetailQuery(defaultQuery);

  // >>>>>> FETCHER AREA <<<<<<
  const serverUrl = useMemo<string>(
    () =>
      buildUrlBasicQuery({
        endpoint: "/sales/report/detail",
        base: SERVER_URL,
        rawQuery: query,
      }),
    [query],
  );

  const fetcher = useFetch<SalesReportDetailReturn>(serverUrl);

  const values: SalesReportDetailContext = {
    ...fetcher,

    query,
  };

  return (
    <SalesDetailReportContext.Provider value={values}>
      {children}
    </SalesDetailReportContext.Provider>
  );
}

export const useSalesReportDetail = () =>
  useContext(SalesDetailReportContext);
