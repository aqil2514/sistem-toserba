import { ActivityLogsDb } from "../types/activity.types";

export function handleActivityDetail(activity: ActivityLogsDb) {
  switch (activity.action) {
    case "ADD_CASH_COUNTER_CASH_COUNTING":
      window.open(
        `/cash-counter?content=cash-counting&action=detail&id=${activity.reference_id}`,
        "_blank",
        "noopener,noreferrer"
      );
      break;

    case "ADD_SALES":
      alert(`Sales added: ${activity.reference_id}`);
      break;

    case "DELETE_SALES":
      alert(`Sales deleted: ${activity.reference_id}`);
      break;

    case "EDIT_SALES":
      alert(`Sales edited: ${activity.reference_id}`);
      break;

    default:
      console.log("No handler for this action");
  }
}
