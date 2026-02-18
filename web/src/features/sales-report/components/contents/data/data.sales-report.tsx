import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  SalesDetailReportProvider,
  useSalesReportDetail,
} from "@/features/sales-report/store/sales-report-detail.provider";
import { SalesReportDetailReturn } from "@/features/sales-report/types/detail.report-sales-type";
import React, { useMemo } from "react";
import { FullData } from "./full.sales-report";
import { ToolbarDatepicker } from "@/components/filters/filter-date-range";
import { useSalesReportDetailQuery } from "@/features/sales-report/hooks/use-sales-report-detail-query";
import { SalesReportSummarizedProduct } from "./summarized-product.sales-report";
import { FilterPanel } from "@/components/filters/filter-panel/master.filter-panel";
import { filterConfigDataReportDetail } from "../../../constants/data-report-filter-config";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SalesReportDetailQuery } from "@/features/sales-report/types/query.report-sales";

export function DataSalesReport() {
  return (
    <SalesDetailReportProvider>
      <InnerTemplate />
    </SalesDetailReportProvider>
  );
}

const InnerTemplate = () => {
  const { data, isLoading, query } = useSalesReportDetail();
  const { updateDateRange, updateFilter } = useSalesReportDetailQuery();
  const memoInitialValue = useMemo(() => query?.filters ?? [], [query]);

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <FilterPanel
          config={filterConfigDataReportDetail}
          initialValue={memoInitialValue}
          onApplyFilter={updateFilter}
        />
        <ToolbarDatepicker
          date={{
            from: query.from,
            to: query.to,
          }}
          onApply={updateDateRange}
          setDate={updateDateRange}
        />
        <ModeSelect />
      </div>
      {isLoading ? <LoadingSpinner /> : <ContentData data={data} />}
    </div>
  );
};

const ContentData: React.FC<{ data: SalesReportDetailReturn | undefined }> = ({
  data,
}) => {
  if (!data) return null;

  const mode = data.mode;

  if (mode === "full") return <FullData data={data} />;
  if (mode === "product") return <SalesReportSummarizedProduct data={data} />;
};

const ModeSelect = () => {
  const { query } = useSalesReportDetail();
  const {updateMode} = useSalesReportDetailQuery()
  return (
    <Select value={query.mode} onValueChange={(e:SalesReportDetailQuery["mode"]) => updateMode(e)} >
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Mode Data" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="full">Full</SelectItem>
          <SelectItem value="product">Ringkasan Produk</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
