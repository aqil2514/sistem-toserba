import { AssetRpcReturn } from "../types/api-return";

type ExtractAssetResult =
  | { isReady: false }
  | {
      isReady: true;
      totalAsset: number;
      liquidAsset: number;
      receivableAsset: number;
      payableAsset: number;
    };

export function extractAsset(
  data: AssetRpcReturn[] | undefined,
): ExtractAssetResult {
  if (!data) return { isReady: false };
  const totalAsset = data.reduce((acc, curr) => acc + curr.total, 0);

  const liquidAsset = data
    .filter((d) => d.asset !== "Piutang" && d.asset !== "Utang")
    .reduce((acc, curr) => acc + curr.total, 0);

  const receivableAsset = data.find((d) => d.asset === "Piutang")?.total ?? 0;
  const payableAsset = data.find((d) => d.asset === "Utang")?.total ?? 0;

  return {
    isReady: true,
    totalAsset,
    liquidAsset,
    receivableAsset,
    payableAsset,
  };
}
