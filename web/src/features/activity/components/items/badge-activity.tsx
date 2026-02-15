"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  ActivityLogsAction,
  ActivityLogsType,
} from "../../types/per-feature/00.master-activity";
import { actionBadgeLabel } from "../../constants/activity-action/action-badge-label";
import { actionBadgeStyle } from "../../constants/activity-action/action-badge-style";
import { typeBadgeLabel } from "../../constants/activity-type/type-badge-label";
import { typeBadgeStyle } from "../../constants/activity-type/type-badge-style";

interface Props {
  activityType: ActivityLogsType;
  activityAction: ActivityLogsAction;
  className?: string;
}

export function ActivityBadge({
  activityType,
  activityAction,
  className,
}: Props) {
  return (
    <div
      className={cn("flex flex-wrap items-center justify-end gap-2", className)}
    >
      <Badge
        variant="outline"
        className={cn("text-xs font-medium", typeBadgeStyle[activityType])}
      >
        {typeBadgeLabel[activityType]}
      </Badge>

      <Badge
        variant="outline"
        className={cn(
          "text-xs font-semibold",
          actionBadgeStyle[activityAction],
        )}
      >
        {actionBadgeLabel[activityAction]}
      </Badge>
    </div>
  );
}
