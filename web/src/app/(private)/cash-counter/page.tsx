import { CashCounterTemplate } from "@/features/cash-counter/cash-counter.template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Penghitung Uang",
};

export default function PrivateCashCounterPage() {
  return <CashCounterTemplate mode="private" />;
}
