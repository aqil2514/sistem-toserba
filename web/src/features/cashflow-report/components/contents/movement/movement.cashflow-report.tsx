import { useCashflowReport } from "@/features/cashflow-report/store/cashflow-report.provider";
import {
  isMovementAssetGlobalSummary,
  isMovementAssetViaSummary,
} from "@/features/cashflow-report/types/type-guard";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ToolbarDatepicker } from "@/components/filters/filter-date-range";
import React from "react";
import {
  CashflowReportContent,
  CashflowReportMode,
} from "@/features/cashflow-report/types/cashflow-report-query.types";
import { CashflowReportAPiReturn } from "@/features/cashflow-report/types/api-return.types";
import { GlobalMovement } from "./chart/global-movement.cashflow-report";
import { AssetMovement } from "./chart/asset-movement.cashflow.report";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CashflowReportMovement() {
  const { data, isLoading, query, updateQuery } = useCashflowReport();

  if (!data || isLoading) return <LoadingSpinner />;

  if (data) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <ToolbarDatepicker
            date={{
              from: query.from,
              to: query.to,
            }}
            onApply={(date) => {
              if (!date) return;
              updateQuery("from", date.from);
              updateQuery("to", date.to);
            }}
            setDate={(date) => {
              if (!date) return;
              updateQuery("from", date.from);
              updateQuery("to", date.to);
            }}
          />
          <SelectMode />
        </div>
        <FlexRender content={query.content} data={data} mode={query.mode} />
      </div>
    );
  }
}

interface FlexRenderProps {
  mode: CashflowReportMode;
  content: CashflowReportContent;
  data: CashflowReportAPiReturn;
}
const FlexRender: React.FC<FlexRenderProps> = ({ mode, content, data }) => {
  if (
    mode === "movement-global" &&
    isMovementAssetGlobalSummary(content, data)
  ) {
    return <GlobalMovement data={data} />;
  }

  if (mode === "movement-asset" && isMovementAssetViaSummary(data, content)) {
    return <AssetMovement data={data} />;
  }
};

const SelectMode = () => {
  const { query, updateQuery } = useCashflowReport();
  return (
    <Select
      value={query.mode as string}
      onValueChange={(e) => updateQuery("mode", e as CashflowReportMode)}
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
