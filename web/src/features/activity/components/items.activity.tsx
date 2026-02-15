import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useActivity } from "../store/activity.store";
import React, { useMemo } from "react";
import { ActivityLogsDb } from "../types/activity.types";
import { ActivityLogItem } from "@/components/molecules/items/activity-logs-item";
import { formatDate } from "@/utils/format-date.fns";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ActivityItems() {
  const { isLoading, data } = useActivity();

  const activities = useMemo<ActivityLogsDb[]>(() => {
    if (!data) return [];

    return data.data;
  }, [data]);

  if (isLoading) return <LoadingSpinner />;
  return (
    <ScrollArea className="h-96">
      <div className="space-y-4 p-4">
        {activities.map((activity) => (
          <ActivityLogItem
            title={activity.title}
            description={activity.description}
            createdAt={formatDate(
              activity.created_at,
              "Senin, 29 Desember 2025, 09:21",
            )}
            FooterActions={<ActivityButton activity={activity} />}
            type={activity.type}
            key={activity.id}
          />
        ))}
      </div>
    </ScrollArea>
  );
}

const ActivityButton: React.FC<{ activity: ActivityLogsDb }> = ({
  activity,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>{activity.title}</DropdownMenuLabel>
          <DropdownMenuItem>Detail</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
