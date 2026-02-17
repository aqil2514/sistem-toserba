import { activityRegistry } from "../../activity.registry";
import { ActivityLogsUnion } from "../../types/activity.types";

interface Props {
  activity: ActivityLogsUnion;
}

export function FlexItemFooter({ activity }: Props) {
  const component = activityRegistry[activity.type];

  if(!component) return null;

  return component(activity);
}
