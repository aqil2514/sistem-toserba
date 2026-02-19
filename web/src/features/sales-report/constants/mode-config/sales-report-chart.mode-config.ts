import { LabelValue } from "@/@types/general";
import { SalesReportChartReturn } from "../../types/chart.report-sales-type";

export const salesReportChartMode: LabelValue<SalesReportChartReturn["mode"]>[] = [
  {
    label: "Per Omzet",
    value: "breakdown",
  },
  {
    label: "Per Produk",
    value: "per-product",
  },
];