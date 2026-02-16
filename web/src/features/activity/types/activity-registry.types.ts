import React from "react";
import { ActivityLogsType } from "./per-feature/00.master-activity";
import { ActivityLogsDb } from "./activity.types";

export interface ActivityRegistry {
  FooterComponent: React.ReactNode;
}

export type ActivityLogsActionComponent = {
  [key in ActivityLogsType]?: (activity: ActivityLogsDb) => React.ReactNode;
};
