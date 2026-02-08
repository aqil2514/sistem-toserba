import { PayableReceivableTemplate } from "@/features/payable-receivable/pr.template";
import { Metadata } from "next";

export const metadata:Metadata = {
    title:"Utang Piutang"
}

export default function PayableReceivablePrivate() {
  return <PayableReceivableTemplate mode="private" />;
}
