import { ActivityLogsDb } from "@/features/activity/types/activity.types";

interface Props {
  activity: ActivityLogsDb;
}

export function CashCounterCountingActivityItemFooter({ activity }: Props) {
  return "Bagian Cash counter couting";
}
