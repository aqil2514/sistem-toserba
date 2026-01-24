import { PurchaseReportTemplate } from "@/features/purchase-report/template.purchase-report";
import { Metadata } from "next";

export const metadata:Metadata = {
    title:"Laporan Pembelian",
}

export default function PurchaseReport(){
    return <PurchaseReportTemplate mode="private" />
}