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
import { AssetSummary } from "./components/summary.assets";
import { useEffect } from "react";
import { toast } from "sonner";

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

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { type } = event.data;
      if (type === "EDIT_ASSET_SUCCESS") {
        toast.success("Data aset berhasil diperbarui");
        mutate?.();
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [mutate]);

  return (
    <MainContainer>
      <SectionContainer>
        <HeaderWithMutate title="Daftar Aset" mutate={mutate} />
        <AssetSummary />
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <DataTable columns={assetsColumnDef} data={data ?? []} />
        )}
      </SectionContainer>
    </MainContainer>
  );
};
