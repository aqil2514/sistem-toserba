import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { ActivityLogsAction } from "../../types/per-feature/00.master-activity";
import React from "react";
import { ActivityLogsDb } from "../../types/activity.types";
import { handleActivityDetail } from "../../utils/detail-callbacks";

const DETAIL_READY: ActivityLogsAction[] = ["ADD_CASH_COUNTER_CASH_COUNTING"];

interface Props {
  activity:ActivityLogsDb
}
export function ActivityItemsFooter({ activity }: Props) {
  const isDetailReady = DETAIL_READY.includes(activity.action);

  if (isDetailReady) return <DetailButton activity={activity} />;

  return null;
}

const DetailButton: React.FC<Props> = ({ activity }) => {
  return (
    <Button
      variant={"outline"}
      size={"icon-sm"}
      onClick={() =>handleActivityDetail(activity)}
    >
      <ExternalLink />
    </Button>
  );
};
