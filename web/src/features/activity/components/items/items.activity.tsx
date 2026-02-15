import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useActivity } from "../../store/activity.store";
import { useMemo } from "react";
import { ActivityLogsDb } from "../../types/activity.types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ActivityLogItem } from "./log-items";

export function ActivityItems() {
  const { isLoading, data } = useActivity();

  const activities = useMemo<ActivityLogsDb[]>(() => {
    if (!data) return [];

    return data.data;
  }, [data]);

  if (isLoading) return <LoadingSpinner />;
  if (activities.length === 0)
    return (
      <div>
        <p>Data tidak ada</p>
      </div>
    );
  return (
    <ScrollArea className="h-96">
      <div className="grid grid-cols-2 gap-4">
        {activities.map((activity) => (
          <ActivityLogItem activity={activity} key={activity.id} />
        ))}
      </div>
    </ScrollArea>
  );
}
