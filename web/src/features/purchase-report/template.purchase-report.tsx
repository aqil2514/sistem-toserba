"use client";
import { TemplateMode } from "@/@types/general";
import { MainContainer } from "@/components/layout/container/main-container";
import { SectionContainer } from "@/components/layout/container/section-container";
import { UnavailableDemo } from "@/components/templates/unavailable-demo";
import { PurchaseReportHeader } from "./components/header/header.purchase-report";
import { PurchaseReportProvider } from "./store/provider.purchase-report";
import { PurchaseReportContents } from "./components/contents/contents.purchase-report";
import { PurchaseReportToolbar } from "./components/toolbar/toolbar.purchase-report";

interface Props {
  mode: TemplateMode;
}

export function PurchaseReportTemplate({ mode }: Props) {
  if (mode === "demo") return <UnavailableDemo />;

  return (
    <PurchaseReportProvider>
      <InnerTemplate />
    </PurchaseReportProvider>
  );
}

const InnerTemplate = () => {
  return (
    <MainContainer>
      <SectionContainer>
        <PurchaseReportHeader />
        <PurchaseReportToolbar />
        <PurchaseReportContents />
      </SectionContainer>
    </MainContainer>
  );
};
