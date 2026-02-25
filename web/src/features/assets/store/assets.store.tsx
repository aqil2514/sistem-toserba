import { SERVER_URL } from "@/constants/url";
import { PurchaseAssetsDbPopulated } from "@/features/purchase/types/items/purchase-assets.interface";
import { createFetchContext } from "@/provider/fetch-provider";

const { Provider: AssetsProvider, useData: useAssetContext } =
  createFetchContext<PurchaseAssetsDbPopulated[]>(`${SERVER_URL}/assets`);

export { AssetsProvider, useAssetContext };
