import { ActivityLogsDb } from "@/features/activity/types/activity.types";
import { AddSalesFooter } from "./add-sales";
import { EditSalesFooter } from "./edit-sales";
import { SalesLogMetaDetail, SalesLogMetaEdit } from "@/features/activity/types/per-feature/sales-activity";
import { DeleteSalesFooter } from "./delete-sales";

interface Props {
  activity: ActivityLogsDb;
}

export function SalesActivityItemFooter({ activity }: Props) {
  const { type, action } = activity;
  if (type !== "sales") return null;

  switch (action) {
    case "ADD_SALES":
      return <AddSalesFooter activity={activity} />;
    case "DELETE_SALES":
      return <DeleteSalesFooter activity={activity as ActivityLogsDb<SalesLogMetaDetail>} />
    case "EDIT_SALES":
      return <EditSalesFooter activity={activity as ActivityLogsDb<SalesLogMetaEdit>} />
    default:
      return null;
  }
}
