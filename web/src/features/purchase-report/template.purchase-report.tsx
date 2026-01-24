import { TemplateMode } from "@/@types/general";
import { MainContainer } from "@/components/layout/container/main-container";
import { SectionContainer } from "@/components/layout/container/section-container";
import { UnavailableDemo } from "@/components/templates/unavailable-demo";
import { PurchaseReportHeader } from "./components/header.purchase-report";

interface Props {
  mode: TemplateMode;
}

export function PurchaseReportTemplate({ mode }: Props) {
  if (mode === "demo") return <UnavailableDemo />;

  return (
    <>
      <InnerTemplate />
    </>
  );
}

const InnerTemplate = () => {
  return (
    <MainContainer>
      <SectionContainer>
        <PurchaseReportHeader />
        <p>Coming Soon</p>
      </SectionContainer>
    </MainContainer>
  );
};
