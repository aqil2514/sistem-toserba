import {
  CashflowReportAllocationProvider,
  useCashflowReportAllocation,
} from "@/features/cashflow-report/store/cashflow-report-allocation.provider";
import { CashflowReportAllocationCard } from "./allocation-card.cashflow-report";
import { CashflowFilterAllocation } from "./allocation-filter.cashflow-report";
import { useQueryParams } from "@/hooks/use-query-params";
import { useMemo } from "react";

export function CashflowReportAllocation() {
  return (
    <CashflowReportAllocationProvider>
      <InnerTemplate />
    </CashflowReportAllocationProvider>
  );
}

const InnerTemplate = () => {
  const { data } = useCashflowReportAllocation();
  const { get } = useQueryParams();
  const type = get("type") ?? "all";
  const categoryName = get("category-name") ?? "";

  const filteredData = useMemo(() => {
    const filtered = data.filter((item) => {
      const matchType = type === "all" || item.status_cashflow === type;
      const matchCategory = item.category_name
        .toLowerCase()
        .includes(categoryName.toLowerCase());
      return matchType && matchCategory;
    });

    return filtered;
  }, [type, data, categoryName]);

  return (
    <div className="space-y-4">
      <CashflowFilterAllocation />

      <CashflowReportAllocationCard data={filteredData} />
    </div>
  );
};
