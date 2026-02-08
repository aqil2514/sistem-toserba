import { CashflowTemplate } from "@/features/cashflow/template.cashflow";
import { Metadata } from "next";

export const metadata:Metadata = {
    title:"DEMO Cashflow"
}

export default function CashflowPage(){
    return <CashflowTemplate mode="demo" />
}