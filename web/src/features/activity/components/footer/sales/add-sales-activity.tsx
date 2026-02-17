import { Button } from "@/components/ui/button";
import {  ActivityLogsUnion } from "@/features/activity/types/activity.types";
import { ExternalLink } from "lucide-react";

interface Props {
  activity: Extract<ActivityLogsUnion, {action:"ADD_SALES"}>;
}

export function AddSalesFooter({ activity }: Props) {
  return (
    <div className="flex gap-4">
      <Button
        variant={"outline"}
        onClick={() =>
          window.open(
            `/sales?action=detail&id=${activity.reference_id}`,
            "_blank",
            "noopener,noreferrer",
          )
        }
      >
        <ExternalLink />
      </Button>
    </div>
  );
}
