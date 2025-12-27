"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

interface UseFetchOptions {
  refreshInterval?: number;
  revalidateOnFocus?: boolean;
}

export function useFetch<T>(
  key: string | null,
  options?: UseFetchOptions
) {
  const { data, error, isLoading, mutate } = useSWR<T>(
    key,
    fetcher,
    {
      revalidateOnFocus: false,
      ...options,
    }
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
