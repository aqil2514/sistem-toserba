import { PurchaseTemplate } from "@/features/purchase/purchase.template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Purchase",
};

export default function Purchase() {
  return <PurchaseTemplate mode="private" />;
}
