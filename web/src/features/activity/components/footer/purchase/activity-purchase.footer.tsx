import { ActivityLogsUnion } from "@/features/activity/types/activity.types";
import { AddPurchaseActivity } from "./add-purchase-activity";
import { EditPurchaseActivity } from "./edit-purchase-activity";
import { DeletePurchaseActivity } from "./delete-purchase-activity";

interface Props {
  activity: ActivityLogsUnion;
}

export function ActivityPurchaseFooter({ activity }: Props) {
  const { action } = activity;

  switch (action) {
    case "ADD_PURCHASE":
      return <AddPurchaseActivity activity={activity} />
    case "EDIT_PURCHASE":
      return <EditPurchaseActivity activity={activity} />;
    case "DELETE_PURCHASE":
      return <DeletePurchaseActivity activity={activity} />
    default:
      return null;
  }
}
