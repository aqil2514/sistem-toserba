import { TemplateMode } from "@/@types/general";
import { MainContainer } from "@/components/layout/container/main-container";
import { SectionContainer } from "@/components/layout/container/section-container";
import { UnavailableDemo } from "@/components/templates/unavailable-demo";
import { CashCounterContents } from "./components/contents/contents.cash-counter";

interface Props {
  mode: TemplateMode;
}

export function CashCounterTemplate({ mode }: Props) {
  if (mode === "demo") return <UnavailableDemo />;

  return <InnerTemplate />;
}

const InnerTemplate = () => {
  return (
    <MainContainer>
      <SectionContainer>
        <h1 className="font-semibold text-2xl">Penghitung Uang</h1>
        <CashCounterContents />
      </SectionContainer>
    </MainContainer>
  );
};
