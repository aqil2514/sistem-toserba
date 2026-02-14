import { CashCounterValues } from "../../types/types.cash-counter-contents";
import {
  TabsContentData,
  TabsContentType,
} from "@/components/organisms/contents/tabs-content";
import { CashCounterDenominations } from "./denominations/denominations.cash-counter";
import { CashCounting } from "./cash-counting/cash-counting.cash-counter";
import { CashCountingReport } from "./cash-counting-report/cash-counting-report";
import { useQueryParams } from "@/hooks/use-query-params";

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
  {
    content: <CashCountingReport />,
    label: "Laporan Hitung Uang",
    value: "report-cash-counting",
  },
];

export function CashCounterContents() {
  const { get, update } = useQueryParams();

  const content = (get("content") as CashCounterValues) ?? "denominations";

  const changeHandler = (value: CashCounterValues) => {
    update({
      content: value,
      action: null,
    });
  };

  return (
    <TabsContentData
      value={content}
      onValueChange={changeHandler}
      tabContents={tabsContent}
    />
  );
}
