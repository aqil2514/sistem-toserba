import { DemoPurchasesContainer } from "@/features/purchase/containers/purchases-demo.container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo Purchase",
};

export default function Purchase() {
  return <DemoPurchasesContainer />;
}
