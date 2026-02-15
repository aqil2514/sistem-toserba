"use client";
import { TemplateMode } from "@/@types/general";
import { UnavailableDemo } from "@/components/templates/unavailable-demo";
import { MainContainer } from "@/components/layout/container/main-container";
import { SectionContainer } from "@/components/layout/container/section-container";
import { ActivityProvider, useActivity } from "./store/activity.store";
import { HeaderWithMutate } from "@/components/organisms/header/header-with-mutate";
import { ActivityItems } from "./components/items.activity";

interface Props {
  mode: TemplateMode;
}

export function ActivityTemplate({ mode }: Props) {
  if (mode === "demo") return <UnavailableDemo />;

  return (
    <ActivityProvider>
      <InnerTemplate />
    </ActivityProvider>
  );
}

const InnerTemplate = () => {
  const { mutate } = useActivity();
  return (
    <MainContainer>
      <SectionContainer>
        <HeaderWithMutate title="Log Aktivitas" mutate={mutate} />
        <ActivityItems />
      </SectionContainer>
    </MainContainer>
  );
};
