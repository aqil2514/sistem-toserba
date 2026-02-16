import { CashCounterCountingActivityItemFooter } from "./components/footer/cash-counter/activity-cash-counter-counting";
import { SalesActivityItemFooter } from "./components/footer/sales/activity-sales-footer";
import { ActivityLogsActionComponent } from "./types/activity-registry.types";

export const activityRegistry: ActivityLogsActionComponent = {
  sales: (activity) => <SalesActivityItemFooter activity={activity} />,
  "cash-counter-cash-counting": (activity) => (
    <CashCounterCountingActivityItemFooter activity={activity} />
  ),
};
