"use client";
import { TemplateMode } from "@/@types/general";
import { MainContainer } from "@/components/layout/container/main-container";
import { SectionContainer } from "@/components/layout/container/section-container";
import { UnavailableDemo } from "@/components/templates/unavailable-demo";
import {
  AssetFinancialProvider,
  useAssetFinancial,
} from "./store/asset-financial.store";
import { AssetFinancialContents } from "./components/contents/contents.asset-financial";
import { AssetFinancialToolbar } from "./components/toolbar/toolbar.asset-financial";
import { HeaderWithMutate } from "@/components/organisms/header/header-with-mutate";
import { AssetFinancialHeader } from "./components/header/header.asset-financial";

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
  const { mutate } = useAssetFinancial();
  return (
    <MainContainer>
      <SectionContainer>
        <HeaderWithMutate title="Aset Finansial" mutate={mutate} />
        <AssetFinancialToolbar />
        <AssetFinancialHeader />
        <AssetFinancialContents />
      </SectionContainer>
    </MainContainer>
  );
};
