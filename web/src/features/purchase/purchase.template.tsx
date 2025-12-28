"use client";

import { useState } from "react";
import { MainContainer } from "@/components/layout/container/main-container";
import { DataTable } from "@/components/ui/data-table";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Separator } from "@/components/ui/separator";
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog";

import { PurchaseHeader } from "./components/header.purchase";
import { PurchaseEmpty } from "./components/empty.purchase";
import { Purchase } from "./types/purchase";
import { PurchaseError } from "./components/error.purchase";
import { purchaseColumns } from "./components/columns.purchase";
import { PurchaseFormDialog } from "./components/form.purchase";
import { PurchaseFormValues } from "./schema/purchase.schema";
import { Product } from "../products/type";
import { PurchaseDetailDialog } from "./components/detail-dialog.purchase";
import { usePurchaseItems } from "./hooks/use-purchase-items";
import { mapPurchaseToFormValues } from "./utils/map-purchase-to-form-values";
import { getDemoPurchaseItems } from "./utils/get-demo-purchase-item";

type PurchaseTemplateProps = {
  mode: "private" | "demo";

  data?: Purchase[];
  products?: Product[];

  isLoading?: boolean;
  error?: Error;

  onCreate: (values: PurchaseFormValues) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, values: PurchaseFormValues) => void;
};

export function PurchaseTemplate({
  mode,
  data = [],
  isLoading = false,
  error,
  onCreate,
  onDelete,
  onUpdate,
  products,
}: PurchaseTemplateProps) {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState<Purchase | null>(null);
  const [detailing, setDetailing] = useState<Purchase | null>(null);
  const [editing, setEditing] = useState<Purchase | null>(null);

  function handleAdd() {
    setEditing(null);
    setOpen(true);
  }

  function handleEdit(purchase: Purchase) {
    setEditing(purchase);
    setOpen(true);
  }

  function handleSubmit(values: PurchaseFormValues) {
    if (editing) {
      onUpdate(editing.id, values); // ⬅️ BARU
      setEditing(null);
    } else {
      onCreate(values);
    }
    setOpen(false);
  }

  const isEditing = Boolean(open && editing);

  const { data: editItems, isLoading: loadingItems } = usePurchaseItems(
    editing?.id,
    isEditing
  );

  const initialValues =
    mode === "private"
      ? editing && editItems
        ? mapPurchaseToFormValues(editing, editItems)
        : undefined
      : editing
      ? mapPurchaseToFormValues(editing, getDemoPurchaseItems(editing.id))
      : undefined;

  const isFormLoading = mode === "private" ? isEditing && loadingItems : false;

  return (
    <MainContainer>
      <div className="w-full max-w-6xl bg-background rounded-lg border shadow-sm p-6 flex flex-col gap-6">
        {/* HEADER */}
        <PurchaseHeader mode={mode} onAdd={handleAdd} />

        <Separator />

        {/* CONTENT */}
        <div className="flex flex-col gap-4">
          {isLoading && <LoadingSpinner label="Memuat data pembelian..." />}

          {error && <PurchaseError />}

          {!isLoading && !error && data.length === 0 && (
            <PurchaseEmpty onAdd={handleAdd} />
          )}

          {!isLoading && !error && data.length > 0 && (
            <DataTable
              columns={purchaseColumns({
                onDelete: setDeleting,
                onDetail: setDetailing,
                onEdit: handleEdit,
              })}
              data={data}
              pageSize={10}
              searchKey="purchase_code"
            />
          )}
        </div>
      </div>

      {/* ADD */}
      <PurchaseFormDialog
        open={open}
        onOpenChange={setOpen}
        onSubmit={handleSubmit}
        mode={mode}
        products={products}
        title={editing ? "Edit Barang Masuk" : "Tambah Barang Masuk"}
        initialValues={initialValues}
        isLoading={isFormLoading}
      />

      {/* DELETE */}
      <ConfirmDeleteDialog
        open={!!deleting}
        onOpenChange={(open) => !open && setDeleting(null)}
        title="Hapus Pembelian"
        description={`Pembelian "${deleting?.purchase_code}" akan dihapus.`}
        confirmText="Hapus Pembelian"
        onConfirm={() => {
          if (!deleting) return;
          onDelete(deleting.id);
          setDeleting(null);
        }}
      />

      <PurchaseDetailDialog
        mode={mode}
        open={!!detailing}
        onOpenChange={(open) => !open && setDetailing(null)}
        purchase={detailing}
      />
    </MainContainer>
  );
}
