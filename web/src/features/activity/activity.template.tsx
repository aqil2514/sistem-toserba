import { TemplateMode } from "@/@types/general";
import { UnavailableDemo } from "@/components/templates/unavailable-demo";
import { ActivityContents } from "./components/activity.contents";

interface Props {
  mode: TemplateMode;
}

export function ActivityTemplate({ mode }: Props) {
  if (mode === "demo") return <UnavailableDemo />;

  return <ActivityContents />
}
