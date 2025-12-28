import { useFetch } from "@/hooks/use-fetch";
import { MappedResponse } from "../components/detail-dialog.purchase";
import { SERVER_URL } from "@/constants/url";

export function usePurchaseItems(purchaseId?: string, enabled?: boolean) {
  const shouldFetch = Boolean(enabled && purchaseId);

  return useFetch<MappedResponse[]>(
    shouldFetch ? `${SERVER_URL}/purchase/${purchaseId}` : null
  );
}
