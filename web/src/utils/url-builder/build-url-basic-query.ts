import { BasicQuery } from "@/@types/general";
import { buildUrlClient, BuildUrlClientOptions } from "./build-url-client";

interface BuildUrlBasicQueryOptions extends BuildUrlClientOptions {
  rawQuery: BasicQuery;
}

export function buildUrlBasicQuery(options: BuildUrlBasicQueryOptions) {
  const { filters, sort, ...restQuery } = options.rawQuery;

  const url = buildUrlClient({
    filters,
    sorts: sort,
    query: restQuery,
    endpoint: options.endpoint,
    base: options.base,
  });

  return url
}
