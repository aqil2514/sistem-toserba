"use client";
import { TemplateMode } from "@/@types/general";
import { MainContainer } from "@/components/layout/container/main-container";
import { SectionContainer } from "@/components/layout/container/section-container";
import { UnavailableDemo } from "@/components/templates/unavailable-demo";
import {
  ReceivablePayableProvider,
  useReceivablePayable,
} from "./store/payable-receivable.provider";
import { HeaderWithMutate } from "@/components/organisms/header/header-with-mutate";
import { PayableReceivableContent } from "./components/contents/contents.payable-receivable";

interface Props {
  mode: TemplateMode;
}

export function PayableReceivableTemplate({ mode }: Props) {
  if (mode === "demo") return <UnavailableDemo />;

  return (
    <ReceivablePayableProvider>
      <InnerTemplate />
    </ReceivablePayableProvider>
  );
}

const InnerTemplate = () => {
  const { mutate } = useReceivablePayable();
  return (
    <MainContainer>
      <SectionContainer>
        <HeaderWithMutate mutate={mutate} title="Utang Piutang" />
        <PayableReceivableContent />
      </SectionContainer>
    </MainContainer>
  );
};
