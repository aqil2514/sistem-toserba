import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useReceivablePayable } from "../../store/payable-receivable.provider";
import { useMemo } from "react";
import { Separator } from "@/components/ui/separator";
import { PayableReceivableFilter } from "../filters/filters.payable-receivable";
import { PayableReceivableSummary } from "./children/summary";
import { useQueryParams } from "@/hooks/use-query-params";
import { FlexCardRender } from "./children/flex-card-render";
import { PayableReceivableDetailDialog } from "../dialogs/detail-pr-dialog";

export function PayableReceivableContent() {
  const { data, isLoading } = useReceivablePayable();
  const { get } = useQueryParams();
  const type = get("type") ?? "mix";
  const counterpartName = get("counterpart_name");

  const selectedData = useMemo(() => {
    if (!data) return [];

    const { payable: payableData, receivable: receivableData } = data;

    const filterByName = <
      T extends { vendor_name?: string; customer_name?: string },
    >(
      items: T[],
      key: keyof T,
    ) => {
      if (!counterpartName) return items;
      return items.filter((item) =>
        String(item[key]).toLowerCase().includes(counterpartName.toLowerCase()),
      );
    };

    switch (type) {
      case "payable":
        return filterByName(payableData, "vendor_name");
      case "receivable":
        return filterByName(receivableData, "customer_name");
      case "mix": {
        const filtered = [
          ...filterByName(payableData, "vendor_name"),
          ...filterByName(receivableData, "customer_name"),
        ];
        return filtered;
      }
      default:
        return [];
    }
  }, [data, type, counterpartName]);

  if (isLoading) return <LoadingSpinner />;
  if (!data) throw new Error("Data tidak ditemukan");

  const payableAmount = data.payable.reduce((acc, curr) => acc + curr.rest, 0);
  const receivableAmount = data.receivable.reduce(
    (acc, curr) => acc + curr.rest,
    0,
  );
  
  return (
    <>
    <div className="space-y-4">
      <PayableReceivableSummary
        payableAmount={payableAmount}
        receivableAmount={receivableAmount}
      />
      <Separator />
      <PayableReceivableFilter />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedData.map((data, i) => (
          <FlexCardRender data={data} key={`data-${i}`} />
        ))}
      </div>
    </div>

    <PayableReceivableDetailDialog />
    </>
  );
}
