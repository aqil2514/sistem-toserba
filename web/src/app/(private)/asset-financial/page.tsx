import { AssetFinancialTemplate } from "@/features/asset-financial/asset-financial.template";
import { Metadata } from "next";

export const metadata:Metadata = {
    title:"Aset Finansial"
}

export default function FinancialAsetPage(){
    return <AssetFinancialTemplate mode="private" />
}