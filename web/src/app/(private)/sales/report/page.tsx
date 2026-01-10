import { SalesReportTemplate } from "@/features/sales-report/template.sales-report";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Laporan Penjualan",
};

export default function SalesReportPage(){
    return <SalesReportTemplate mode="private" />
}