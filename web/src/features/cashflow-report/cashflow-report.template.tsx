"use client";
import { TemplateMode } from "@/@types/general";
import { MainContainer } from "@/components/layout/container/main-container";
import { SectionContainer } from "@/components/layout/container/section-container";
import { UnavailableDemo } from "@/components/templates/unavailable-demo";
import { CashflowReportContents } from "./components/contents/contents.cashflow-report";

interface Props {
  mode: TemplateMode;
}

export function CashflowReportTemplate({ mode }: Props) {
  if (mode === "demo") return <UnavailableDemo />;

  return (
    <MainContainer>
      <SectionContainer>
        <h1 className="font-semibold text-2xl">Laporan Cashflow</h1>
        <CashflowReportContents />
      </SectionContainer>
    </MainContainer>
  );
}
