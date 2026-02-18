import { useQueryBasics } from "@/hooks/use-query-basics";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { SalesReportDetailQuery } from "../types/query.report-sales";
import { useMemo } from "react";
import {
  mergeQueryWithDefaults,
  parseSearchParamsToBasicQuery,
} from "@/utils/url-builder/parse-url-to-basic-query";

export function useSalesReportDetailQuery(
  defaultQuery?: SalesReportDetailQuery,
) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const basicQuery = useQueryBasics(defaultQuery);

  const query = useMemo(() => {
    return defaultQuery
      ? mergeSalesReportDetailQueryWithDefaults(defaultQuery, searchParams)
      : parseSearchParamsToSalesReportDetailQuery(searchParams);
  }, [defaultQuery, searchParams]);

  const updateMode = (mode: SalesReportDetailQuery["mode"]) => {
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

function parseSearchParamsToSalesReportDetailQuery(
  searchParams: URLSearchParams,
): SalesReportDetailQuery {
  const basicQuery = parseSearchParamsToBasicQuery(searchParams);
  return {
    ...basicQuery,
    mode:
      (searchParams.get("mode") as SalesReportDetailQuery["mode"]) ?? "full",
  };
}

function mergeSalesReportDetailQueryWithDefaults(
  defaults: SalesReportDetailQuery,
  searchParams: URLSearchParams,
): SalesReportDetailQuery {
  const basicQuery = mergeQueryWithDefaults(defaults, searchParams);
  const queryMode = searchParams.get("mode") as SalesReportDetailQuery["mode"];

  return {
    ...basicQuery,
    mode: queryMode ? queryMode : defaults.mode,
  };
}
