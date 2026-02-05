import { MutateButton } from "@/components/ui/mutate-button";
import { useAssetFinancial } from "../../store/asset-financial.store";

export function AssetFinancialHeader() {
  const { mutate } = useAssetFinancial();
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl">Aset Finansial</h1>

        <div className="flex gap-4">
          <MutateButton mutate={mutate} />
        </div>
      </div>
    </div>
  );
}
