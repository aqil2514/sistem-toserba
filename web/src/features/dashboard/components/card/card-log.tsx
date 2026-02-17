"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { MutateButton } from "@/components/ui/mutate-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SERVER_URL } from "@/constants/url";
import { ActivityBadge } from "@/features/activity/components/items/badge-activity";
import { ActivityLogsUnion } from "@/features/activity/types/activity.types";
import { useFetch } from "@/hooks/use-fetch";
import { usePusher } from "@/hooks/use-pusher";
import { formatDate } from "@/utils/format-date.fns";
import Link from "next/link";

export function ActivityLogCard() {
  const { data, isLoading, mutate } = useFetch<ActivityLogsUnion[]>(
    `${SERVER_URL}/dashboard/logs`,
  );

  const serverData = data ?? [];

  usePusher<{ logs: ActivityLogsUnion[] }>(
    "dashboard-channel",
    "new-log",
    (payload) => {
      mutate((current) => {
        const newData = payload.logs[0];
        if (!current) return undefined;
        if (!newData) return current;
        if (current.some((item) => item.id === newData.id)) return current;

        return [newData, ...current].slice(0, 5);
      }, false);
    },
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Log Aktivitas</CardTitle>
        <CardDescription>
          Per : {formatDate(new Date(), "Senin, 29 Desember 2025")}
        </CardDescription>
        <CardAction>
          <MutateButton mutate={mutate} />
        </CardAction>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-4">
        <ScrollArea className="h-72">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="space-y-4">
              {serverData.map((item) => (
                <div key={item.id} className="border rounded-2xl p-4">
                  <p className="font-semibold text-muted-foreground">
                    {item.title}
                  </p>

                  <ActivityBadge
                    activityType={item.type}
                    activityAction={item.action}
                  />
                  <p className="text-sm font-bold mt-2 text-muted-foreground">
                    {formatDate(
                      item.created_at,
                      "Senin, 29 Desember 2025, 09:21",
                    )}
                  </p>
                  <Separator className="my-2" />
                  <p className="text-sm font-semibold text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <Separator />
      <CardFooter>
        <Link href={"/activity"} target="_blank">
          <Button variant={"outline"}>Halaman Log Aktivitas</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
