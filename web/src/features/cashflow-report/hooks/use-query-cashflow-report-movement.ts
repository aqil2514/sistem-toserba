import { useRouter, useSearchParams } from "next/navigation";
import { CashflowReportMovementQuery } from "../types/cashflow-report-query.types";
import { useQueryBasics } from "@/hooks/use-query-basics";
import {
  mergeQueryWithDefaults,
  parseSearchParamsToBasicQuery,
} from "@/utils/url-builder/parse-url-to-basic-query";
import { useMemo } from "react";

export function useQueryCashflowReportMovement(
  defaultQuery?: CashflowReportMovementQuery,
) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const basicQuery = useQueryBasics(defaultQuery);

  const query = useMemo(() => {
    return defaultQuery
      ? mergeSalesReportChartQueryWithDefaults(defaultQuery, searchParams)
      : parseSearchParamsToSalesReportChartQuery(searchParams);
  }, [defaultQuery, searchParams]);

  const updateMode = (mode: CashflowReportMovementQuery["mode"]) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("mode", mode);

    router.replace(`?${params.toString()}`);
  };

  return {
    ...basicQuery,
    updateMode,
    query,
  };
}

function parseSearchParamsToSalesReportChartQuery(
  searchParams: URLSearchParams,
): CashflowReportMovementQuery {
  const basicQuery = parseSearchParamsToBasicQuery(searchParams);
  return {
    ...basicQuery,
    mode:
      (searchParams.get("mode") as CashflowReportMovementQuery["mode"]) ??
      "movement-global",
  };
}

function mergeSalesReportChartQueryWithDefaults(
  defaults: CashflowReportMovementQuery,
  searchParams: URLSearchParams,
): CashflowReportMovementQuery {
  const basicQuery = mergeQueryWithDefaults(defaults, searchParams);
  const queryMode = searchParams.get(
    "mode",
  ) as CashflowReportMovementQuery["mode"];

  return {
    ...basicQuery,
    mode: queryMode ? queryMode : defaults.mode,
  };
}
