import { CashflowReportTemplate } from "@/features/cashflow-report/cashflow-report.template";
import { Metadata } from "next";

export const metadata:Metadata = {
    title:"Laporan Alur Kas"
}

export default function CashflowReport(){
    return <CashflowReportTemplate mode="private" />
}