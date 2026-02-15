import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ActivityLogsDb } from "../../types/activity.types";
import { ActivityBadge } from "./badge-activity";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/utils/format-date.fns";
import { ActivityItemsFooter } from "./items-footer.activity";

interface Props {
  activity: ActivityLogsDb;
}
export function ActivityLogItem({ activity }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{activity.title}</CardTitle>
        <ActivityBadge
          activityType={activity.type}
          activityAction={activity.action}
        />
      </CardHeader>
      <CardContent className="space-y-4">
        <Separator />
        <p className="text-end text-sm font-semibold">{formatDate(activity.created_at, "Senin, 29 Desember 2025, 09:21")}</p>
        <p className=" text-muted-foreground">{activity.description}</p>
        <Separator />
      </CardContent>
      <CardFooter>
        <ActivityItemsFooter activity={activity} />
      </CardFooter>
    </Card>
  );
}
