"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Options = {
  baseUrl?: string;
  replace?: boolean;
};

export function useQueryParams(options?: Options) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const basePath = options?.baseUrl ?? pathname;
  const navigate = options?.replace ? router.replace : router.push;

  const get = (name: string) => searchParams.get(name);
  const getAll = (name: string) => searchParams.getAll(name);

  const set = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);

    const url = params.toString()
      ? `${basePath}?${params.toString()}`
      : basePath;

    navigate(url);
  };

  const remove = (name: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(name);

    const url = params.toString()
      ? `${basePath}?${params.toString()}`
      : basePath;

    navigate(url);
  };

  const update = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    const url = params.toString()
      ? `${basePath}?${params.toString()}`
      : basePath;

    navigate(url);
  };

  return {
    get,
    getAll,
    set,
    remove,
    update,
  };
}
