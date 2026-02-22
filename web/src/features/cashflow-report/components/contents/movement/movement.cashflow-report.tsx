import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ToolbarDatepicker } from "@/components/filters/filter-date-range";
import React from "react";
import { CashflowReportMovementMode } from "@/features/cashflow-report/types/cashflow-report-query.types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CashflowReportdMovementProvider,
  useCashflowReportMovement,
} from "@/features/cashflow-report/store/cashflow-report-movement.provider";
import { useQueryCashflowReportMovement } from "@/features/cashflow-report/hooks/use-query-cashflow-report-movement";
import { CashflowReportMovement as CashflowReportMovementType } from "@/features/cashflow-report/types/cashflow-report-api-return.types";
import { GlobalMovement } from "./chart/global-movement.cashflow-report";
import { AssetMovement } from "./chart/asset-movement.cashflow.report";
import { MutateButton } from "@/components/ui/mutate-button";

export function CashflowReportMovement() {
  return (
    <CashflowReportdMovementProvider>
      <InnerTemplate />
    </CashflowReportdMovementProvider>
  );
}

const InnerTemplate = () => {
  const { data, isLoading, query, mutate } = useCashflowReportMovement();
  const { updateDateRange } = useQueryCashflowReportMovement(query);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <ToolbarDatepicker
          date={{
            from: query.from,
            to: query.to,
          }}
          onApply={updateDateRange}
          setDate={updateDateRange}
        />
        <div className="flex gap-2">
          <SelectMode />
                <MutateButton mutate={mutate} />
        </div>
      </div>
      <FlexRender data={data} />
    </div>
  );
};

interface FlexRenderProps {
  data: CashflowReportMovementType;
}
const FlexRender: React.FC<FlexRenderProps> = ({ data }) => {
  switch (data.type) {
    case "movement-asset":
      return <AssetMovement data={data.data} />;

    default:
      return <GlobalMovement data={data.data} />;
  }
};

const SelectMode = () => {
  const { query } = useCashflowReportMovement();
  const { updateMode } = useQueryCashflowReportMovement(query);
  return (
    <Select
      value={query.mode}
      onValueChange={(e) => updateMode(e as CashflowReportMovementMode)}
    >
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="movement-global">Keseluruhan</SelectItem>
          <SelectItem value="movement-asset">Per Aset</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
