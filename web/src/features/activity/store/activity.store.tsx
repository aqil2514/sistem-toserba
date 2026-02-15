import { KeyedMutator } from "swr";
import React, { createContext, useContext, useMemo } from "react";
import { useFetch } from "@/hooks/use-fetch";
import { BasicQuery, DataQueryResponse } from "@/@types/general";
import { SERVER_URL } from "@/constants/url";
import { startOfDay, startOfMonth } from "date-fns";
import { buildUrlBasicQuery } from "@/utils/url-builder/build-url-basic-query";
import { useQueryBasics } from "@/hooks/use-query-basics";
import { ActivityLogsDb } from "../types/activity.types";

interface ActivityContextType {
  data: DataQueryResponse<ActivityLogsDb[]> | undefined;
  error: Error;
  isLoading: boolean;
  mutate: KeyedMutator<DataQueryResponse<ActivityLogsDb[]>>;

  query: BasicQuery;
}

const ActivityContext = createContext<ActivityContextType>(
  {} as ActivityContextType,
);

const defaultQuery: BasicQuery = {
  limit: 10,
  page: 1,
  from: startOfMonth(startOfDay(new Date())),
  to: startOfDay(new Date()),
  filters: [],
  sort: [
    {
      key: "created_at",
      value: "desc",
    },
  ],
};

export function ActivityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { query } = useQueryBasics(defaultQuery);

  // >>>>>> FETCHER AREA <<<<<<
  const serverUrl = useMemo<string>(
    () =>
      buildUrlBasicQuery({
        endpoint: "/activity",
        base: SERVER_URL,
        rawQuery: query,
      }),
    [query],
  );
  
  const fetcher = useFetch<DataQueryResponse<ActivityLogsDb[]>>(serverUrl);

  const values: ActivityContextType = {
    ...fetcher,

    query,
  };

  return (
    <ActivityContext.Provider value={values}>
      {children}
    </ActivityContext.Provider>
  );
}

export const useActivity = () => useContext(ActivityContext);
