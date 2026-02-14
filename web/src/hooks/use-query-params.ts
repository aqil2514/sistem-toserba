import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const get = (name:string) => searchParams.get(name);
  const getAll = (name:string) => searchParams.getAll(name);
  
  const set = (name:string, value:string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name,value);

    router.push(`${pathname}?${params.toString()}`)
  }

  const remove = (name:string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(name);

    router.push(`${pathname}?${params.toString()}`)
  }

  return {
    get, getAll, set, remove
  }
}
