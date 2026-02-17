import { CashCounterCountingActivityItemFooter } from "./components/footer/cash-counter/activity-cash-counter-counting";
import { ActivityPurchaseFooter } from "./components/footer/purchase/activity-purchase.footer";
import { SalesActivityItemFooter } from "./components/footer/sales/activity-sales-footer";
import { ActivityLogsActionComponent } from "./types/activity-registry.types";

export const activityRegistry: ActivityLogsActionComponent = {
  sales: (activity) => <SalesActivityItemFooter activity={activity} />,
  "cash-counter-cash-counting": (activity) => (
    <CashCounterCountingActivityItemFooter activity={activity} />
  ),
  purchase: (activity) => <ActivityPurchaseFooter activity={activity} />,
};
