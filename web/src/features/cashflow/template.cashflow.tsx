"use client";
import { TemplateMode } from "@/@types/general";
import { MainContainer } from "@/components/layout/container/main-container";
import { SectionContainer } from "@/components/layout/container/section-container";
import { UnavailableDemo } from "@/components/templates/unavailable-demo";
import { CashflowHeader } from "./components/header/header.cashflow";
import { CashflowProvider } from "./store/provider.cashflow";
import { CashflowAddDialog } from "./components/dialog/add-dialog.cashflow";

interface Props {
  mode: TemplateMode;
}

export function CashflowTemplate({ mode }: Props) {
  if (mode === "demo") return <UnavailableDemo />;

  return (
    <CashflowProvider>
      <InnerTemplate />
    </CashflowProvider>
  );
}

const InnerTemplate = () => {
  return (
    <>
      <MainContainer>
        <SectionContainer>
          <CashflowHeader />
        </SectionContainer>
      </MainContainer>

      <CashflowAddDialog />
    </>
  );
};
