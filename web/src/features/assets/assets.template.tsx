"use client";
import { TemplateMode } from "@/@types/general";
import { MainContainer } from "@/components/layout/container/main-container";
import { SectionContainer } from "@/components/layout/container/section-container";
import { UnavailableDemo } from "@/components/templates/unavailable-demo";
import { AssetsProvider, useAssetContext } from "./store/assets.store";
import { HeaderWithMutate } from "@/components/organisms/header/header-with-mutate";
import { DataTable } from "@/components/organisms/custom-data-table/core-table";
import { assetsColumnDef } from "./columns/assets-columns";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface Props {
  mode: TemplateMode;
}

export function AssetsTemplate({ mode }: Props) {
  if (mode === "demo") return <UnavailableDemo />;

  return (
    <AssetsProvider>
      <InnerTemplate />
    </AssetsProvider>
  );
}

const InnerTemplate = () => {
  const { mutate, data, isLoading } = useAssetContext();

  return (
    <MainContainer>
      <SectionContainer>
        <HeaderWithMutate title="Daftar Aset" mutate={mutate} />
        {isLoading ? <LoadingSpinner /> : <DataTable columns={assetsColumnDef} data={data ?? []}  />}
      </SectionContainer>
    </MainContainer>
  );
};
