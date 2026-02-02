import { CashflowTemplate } from "@/features/cashflow/template.cashflow";
import { Metadata } from "next";

export const metadata:Metadata = {
    title:"Cashflow"
}

export default function CashflowPage(){
    return <CashflowTemplate mode="private" />
}