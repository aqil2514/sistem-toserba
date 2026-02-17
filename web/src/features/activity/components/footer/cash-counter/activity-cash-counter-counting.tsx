import { ActivityLogsUnion } from "@/features/activity/types/activity.types";

interface Props {
  activity: ActivityLogsUnion;
}

export function CashCounterCountingActivityItemFooter({ activity }: Props) {
  return "Bagian Cash counter couting";
}
