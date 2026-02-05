"use client";
import { TemplateMode } from "@/@types/general";
import { MainContainer } from "@/components/layout/container/main-container";
import { SectionContainer } from "@/components/layout/container/section-container";
import { UnavailableDemo } from "@/components/templates/unavailable-demo";
import { CashflowHeader } from "./components/header/header.cashflow";
import { CashflowProvider } from "./store/provider.cashflow";
import { CashflowAddDialog } from "./components/dialog/add-dialog.cashflow";
import { CashflowData } from "./components/data/data.cashflow";
import { CashflowToolbar } from "./components/toolbar/toolbar.cashflow";
import { CashflowEditDialog } from "./components/dialog/edit-dialog.cashflow";
import { CashflowDeleteDialog } from "./components/dialog/delete-dialog.cashflow";
import { CashflowDetailDialog } from "./components/dialog/detail-dialog.cashflow";

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
          <CashflowToolbar />
          <CashflowData />
        </SectionContainer>
      </MainContainer>

      <CashflowDetailDialog />
      <CashflowAddDialog />
      <CashflowEditDialog />
      <CashflowDeleteDialog />
    </>
  );
};
