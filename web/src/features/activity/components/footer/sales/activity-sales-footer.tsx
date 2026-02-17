import { ActivityLogsUnion } from "@/features/activity/types/activity.types";
import { AddSalesFooter } from "./add-sales-activity";
import { EditSalesFooter } from "./edit-sales-activity";
import { DeleteSalesFooter } from "./delete-sales-activity";

interface Props {
  activity: ActivityLogsUnion;
}

export function SalesActivityItemFooter({ activity }:Props) {
  const { action } = activity;

  switch (action) {
    case "ADD_SALES":
      return <AddSalesFooter activity={activity} />;
    case "DELETE_SALES":
      return <DeleteSalesFooter activity={activity} />
    case "EDIT_SALES":
      return <EditSalesFooter activity={activity} />
    default:
      return null;
  }
}
