import { PurchasesContainer } from "@/features/purchase/containers/purchases.container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Purchase",
};

export default function Purchase() {
  return <PurchasesContainer />;
}
