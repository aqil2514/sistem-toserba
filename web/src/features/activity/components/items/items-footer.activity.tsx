import { activityRegistry } from "../../activity.registry";
import { ActivityLogsDb } from "../../types/activity.types";

interface Props {
  activity: ActivityLogsDb;
}

export function FlexItemFooter({ activity }: Props) {
  const component = activityRegistry[activity.type];

  if(!component) return null;

  return component(activity);
}
