import { PurchaseReportTemplate } from "@/features/purchase-report/template.purchase-report";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DEMO Laporan Pembelian",
};

export default function PurchaseReport() {
  return <PurchaseReportTemplate mode="demo" />;
}
