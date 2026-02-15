"use client";
import { TemplateMode } from "@/@types/general";
import { UnavailableDemo } from "@/components/templates/unavailable-demo";
import { MainContainer } from "@/components/layout/container/main-container";
import { SectionContainer } from "@/components/layout/container/section-container";
import { ActivityProvider, useActivity } from "./store/activity.store";
import { HeaderWithMutate } from "@/components/organisms/header/header-with-mutate";
import { ActivityItems } from "./components/items/items.activity";
import { DataTableFooterServer } from "@/components/organisms/ori-data-table/data-table-footer-server";
import { useQueryBasics } from "@/hooks/use-query-basics";
import { ActivityToolbar } from "./components/activity.toolbar";
import { useMemo } from "react";

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
  const { mutate, data, query } = useActivity();
  const { updateFooter } = useQueryBasics();

  const memoQuery = useMemo(() => query, [query]);
  return (
    <MainContainer>
      <SectionContainer>
        <HeaderWithMutate title="Log Aktivitas" mutate={mutate} />
        <ActivityToolbar />
        <ActivityItems />
        <DataTableFooterServer
          meta={data?.meta}
          query={memoQuery}
          onQueryChange={updateFooter}
        />
      </SectionContainer>
    </MainContainer>
  );
};
