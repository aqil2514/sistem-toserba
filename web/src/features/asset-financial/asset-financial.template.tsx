"use client";
import { TemplateMode } from "@/@types/general";
import { MainContainer } from "@/components/layout/container/main-container";
import { SectionContainer } from "@/components/layout/container/section-container";
import { UnavailableDemo } from "@/components/templates/unavailable-demo";
import { AssetFinancialProvider } from "./store/asset-financial.store";
import { AssetFinancialHeader } from "./components/header/header.asset-financial";
import { AssetFinancialContents } from "./components/contents/contents.asset-financial";
import { AssetFinancialToolbar } from "./components/toolbar/toolbar.asset-financial";

interface Props {
  mode: TemplateMode;
}

export function AssetFinancialTemplate({ mode }: Props) {
  if (mode === "demo") return <UnavailableDemo />;

  return (
    <AssetFinancialProvider>
      <InnerTemplate />
    </AssetFinancialProvider>
  );
}

const InnerTemplate = () => {
  return (
    <MainContainer>
      <SectionContainer>
        <AssetFinancialHeader />
        <AssetFinancialToolbar />
        <AssetFinancialContents />
      </SectionContainer>
    </MainContainer>
  );
};
