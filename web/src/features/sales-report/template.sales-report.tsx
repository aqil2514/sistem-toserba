"use client";
import { MainContainer } from "@/components/layout/container/main-container";
import { SectionContainer } from "@/components/layout/container/section-container";
import { SalesReportHeader } from "./components/header/header.sales-report";
import { TemplateMode } from "@/@types/general";
import { UnavailableDemo } from "@/components/templates/unavailable-demo";
import { SalesReportContents } from "./components/contents/sales-report.contents";

interface Props {
  mode: TemplateMode;
}

export function SalesReportTemplate({ mode }: Props) {
  if (mode === "demo") return <UnavailableDemo />;

  return <InnerTemplate />;
}

const InnerTemplate = () => {
  return (
    <MainContainer>
      <SectionContainer>
        <SalesReportHeader />

        <SalesReportContents />
      </SectionContainer>
    </MainContainer>
  );
};
