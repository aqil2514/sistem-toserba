import { MainContainer } from "@/components/layout/container/main-container";
import { TemplateMode } from "@/@types/general";
import { UnavailableDemo } from "@/components/templates/unavailable-demo";
import { ActivityLogCard } from "./components/card/card-log";

interface Props {
  mode: TemplateMode;
}

export function DashboardTemplate({ mode }: Props) {
  if (mode === "demo") return <UnavailableDemo />;

  return (
    <MainContainer>
      <div className="grid grid-cols-3 w-full gap-4">
        <div>Soon</div>
        <div>Soon</div>
        <ActivityLogCard />
      </div>
    </MainContainer>
  );
}
