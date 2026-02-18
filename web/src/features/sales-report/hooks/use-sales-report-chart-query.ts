import { useQueryBasics } from "@/hooks/use-query-basics";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { SalesReportChartQuery } from "../types/query.report-sales";
import { useMemo } from "react";
import {
  mergeQueryWithDefaults,
  parseSearchParamsToBasicQuery,
} from "@/utils/url-builder/parse-url-to-basic-query";

export function useSalesReportChartQuery(defaultQuery?: SalesReportChartQuery) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const basicQuery = useQueryBasics(defaultQuery);

  const query = useMemo(() => {
    return defaultQuery
      ? mergeSalesReportChartQueryWithDefaults(defaultQuery, searchParams)
      : parseSearchParamsToSalesReportChartQuery(searchParams);
  }, [defaultQuery, searchParams]);

  const updateMode = (mode: SalesReportChartQuery["mode"]) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("mode", mode);

    router.replace(`?${params.toString()}`);
  };

  const updateGroupBy = (groupBy: SalesReportChartQuery["groupBy"] | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!groupBy || groupBy === null) return params.delete("groupBy");

    params.set("groupBy", groupBy);

    router.replace(`?${params.toString()}`);
  };

  return {
    ...basicQuery,
    updateMode,
    query,
    updateGroupBy,
  };
}

function parseSearchParamsToSalesReportChartQuery(
  searchParams: URLSearchParams,
): SalesReportChartQuery {
  const basicQuery = parseSearchParamsToBasicQuery(searchParams);
  return {
    ...basicQuery,
    mode: (searchParams.get("mode") as SalesReportChartQuery["mode"]) ?? "full",
    groupBy: (searchParams.get("groupBy") as SalesReportChartQuery["groupBy"]) ?? "day",
  };
}

function mergeSalesReportChartQueryWithDefaults(
  defaults: SalesReportChartQuery,
  searchParams: URLSearchParams,
): SalesReportChartQuery {
  const basicQuery = mergeQueryWithDefaults(defaults, searchParams);
  const queryMode = searchParams.get("mode") as SalesReportChartQuery["mode"];
  const groupByMode = searchParams.get("groupBy") as SalesReportChartQuery["groupBy"];

  return {
    ...basicQuery,
    mode: queryMode ? queryMode : defaults.mode,
    groupBy: groupByMode ? groupByMode : defaults.groupBy
  };
}
