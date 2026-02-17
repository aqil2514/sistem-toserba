import { BasicQuery, FilterState, SortState } from "@/@types/general";
import {
  mergeQueryWithDefaults,
  parseSearchParamsToBasicQuery,
} from "@/utils/url-builder/parse-url-to-basic-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { DateRange } from "react-day-picker";

export function useQueryBasics(defaults?: BasicQuery) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // HELPERS
  const replaceParams = (modifier: (params: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams.toString());

    modifier(params);

    router.replace(`?${params.toString()}`);
  };

  // EXPORTS
  const query = useMemo(() => {
    return defaults
      ? mergeQueryWithDefaults(defaults, searchParams)
      : parseSearchParamsToBasicQuery(searchParams);
  }, [searchParams, defaults]);

  const updatePage = (page: number) => {
    replaceParams((params) => {
      params.set("page", String(page));
    });
  };

  const updateLimit = (limit: number) => {
    replaceParams((params) => {
      params.set("limit", String(limit));
      params.set("page", "1");
    });
  };

  const updateDateRange = (date: DateRange) => {
    replaceParams((params) => {
      if (date.from) params.set("from", date.from.toISOString());
      else params.delete("from");

      if (date.to) params.set("to", date.to.toISOString());
      else params.delete("to");

      params.set("page", "1");
    });
  };

  const updateFooter = <K extends keyof BasicQuery>(
    key: keyof BasicQuery,
    value: BasicQuery[K],
  ) => {
    if (key === "limit") {
      updateLimit(value as number);
    } else {
      updatePage(value as number);
    }
  };

  const updateFilter = (state: FilterState[]) => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("filter");

    if (state.length === 0) {
      params.set("page", "1");
      router.replace(`?${params.toString()}`);
      return;
    }

    state.forEach((value) => {
      const val = `${value.key}:${value.operator ?? "eq"}:${value.value}`;
      params.append("filter", val);
    });

    params.set("page", "1");

    router.replace(`?${params.toString()}`);
  };

  const updateSort = (state: SortState[]) => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("sort");

    if (state.length === 0) {
      params.set("page", "1");
      router.replace(`?${params.toString()}`);
      return;
    }

    state.forEach((value) => {
      const val = `${value.key}:${value.value}`;
      params.append("sort", val);
    });

    params.set("page", "1");

    router.replace(`?${params.toString()}`);
  };

  return {
    query,
    updateDateRange,
    updatePage,
    updateLimit,
    updateFooter,
    updateFilter,
    updateSort,
  };
}
