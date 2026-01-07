import { PurchaseTemplate } from "@/features/purchase/purchase.template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo Purchase",
};

export default function Purchase() {
  return <PurchaseTemplate mode="demo" />
}
