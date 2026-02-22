"use client";
import { TemplateMode } from "@/@types/general";
import { MainContainer } from "@/components/layout/container/main-container";
import { SectionContainer } from "@/components/layout/container/section-container";
import { UnavailableDemo } from "@/components/templates/unavailable-demo";
import { HeaderWithMutate } from "@/components/organisms/header/header-with-mutate";
import { CashflowReportContents } from "./components/contents/contents.cashflow-report";

interface Props {
  mode: TemplateMode;
}

export function CashflowReportTemplate({ mode }: Props) {
  if (mode === "demo") return <UnavailableDemo />;

  return (
    <MainContainer>
      <SectionContainer>
        <HeaderWithMutate title="Laporan Cashflow" />
        <CashflowReportContents />
      </SectionContainer>
    </MainContainer>
  );
}
