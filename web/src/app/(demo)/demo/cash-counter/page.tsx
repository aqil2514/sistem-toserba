import { CashCounterTemplate } from "@/features/cash-counter/cash-counter.template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DEMO Penghitung Uang",
};

export default function DemoCashCounterPage() {
  return <CashCounterTemplate mode="demo" />;
}
