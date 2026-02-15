import { BasicQuery } from "@/@types/general";
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

  return { query, updateDateRange, updatePage, updateLimit, updateFooter };
}
