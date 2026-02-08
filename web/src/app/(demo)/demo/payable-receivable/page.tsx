import { PayableReceivableTemplate } from "@/features/payable-receivable/pr.template";
import { Metadata } from "next";

export const metadata:Metadata = {
    title:"DEMO Utang Piutang"
}

export default function PayableReceivableDemo() {
  return <PayableReceivableTemplate mode="demo" />;
}
