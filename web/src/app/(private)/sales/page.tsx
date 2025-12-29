import SalesTemplate from "@/features/sales/sales.template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Penjualan",
};

export default function SalesPage(){
    return <SalesTemplate mode="private" />
}