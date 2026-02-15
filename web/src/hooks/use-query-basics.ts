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

  const query = useMemo(() => {
    return defaults
      ? mergeQueryWithDefaults(defaults, searchParams)
      : parseSearchParamsToBasicQuery(searchParams);
  }, [searchParams, defaults]);

  const updatePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(page));

    router.replace(`?${params.toString()}`);
  };

  const updateLimit = (limit: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("limit", String(limit));

    router.replace(`?${params.toString()}`);
  };

  const updateDateRange = (date: DateRange) => {
    const params = new URLSearchParams(searchParams.toString());

    if (date.from) {
      params.set("from", date.from.toISOString());
    } else {
      params.delete("from");
    }

    if (date.to) {
      params.set("to", date.to.toISOString());
    } else {
      params.delete("to");
    }

    params.set("page", "1");

    router.replace(`?${params.toString()}`);
  };

  const updateFooter = (key: keyof BasicQuery, value: BasicQuery[keyof BasicQuery]) => {
    if (key === "limit") {
      updateLimit(value as number);
    } else {
      updatePage(value as number);
    }
  };

  return { query, updateDateRange, updatePage, updateLimit, updateFooter };
}
