import { useState } from "react";
import { CashCounterValues } from "../../types/types.cash-counter-contents";
import {
  TabsContentData,
  TabsContentType,
} from "@/components/organisms/contents/tabs-content";
import { CashCounterDenominations } from "../denominations/denominations.cash-counter";
import { CashCounting } from "../cash-counting/cash-counting.cash-counter";

const tabsContent: TabsContentType<CashCounterValues>[] = [
  {
    content: <CashCounterDenominations />,
    label: "Denominasi",
    value: "denominations",
  },
  {
    content: <CashCounting />,
    label: "Hitung Uang",
    value: "cash-counting",
  },
];

export function CashCounterContents() {
  const [content, setContent] = useState<CashCounterValues>("denominations");
  return (
    <TabsContentData
      value={content}
      onValueChange={setContent}
      tabContents={tabsContent}
    />
  );
}
