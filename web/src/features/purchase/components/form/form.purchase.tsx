import { useForm, UseFormReturn, useWatch } from "react-hook-form";
import {
  defaultItemByType,
  EMPTY_VALUES,
  PurchaseFormValues,
  purchaseSchema,
} from "../../schema/purchase.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormHeader } from "./form-header.purchase";
import React, { useEffect } from "react";
import { toast } from "sonner";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormPurchaseItem } from "./items/form-item.purchase";
import { FormPurchaseAssets } from "./items/form-assets.purchase";
import { FormPurchaseConsumables } from "./items/form-consumables.purchase";

interface Props {
  initialValues?: PurchaseFormValues;
  onSubmit: (values: PurchaseFormValues) => void;
}

export function PurchaseForm({ onSubmit, initialValues }: Props) {
  const form = useForm<PurchaseFormValues>({
    resolver: zodResolver(purchaseSchema),
    defaultValues: initialValues ?? EMPTY_VALUES,
  });

  const purchaseType = useWatch({
    control: form.control,
    name: "purchase_type",
  });

  useEffect(() => {
    if (purchaseType === "unselect") return;
    form.setValue("items", [defaultItemByType[purchaseType]]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchaseType]);

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, () =>
          toast.error("Ada data yang belum diisi"),
        )}
        className="space-y-4"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <FormHeader form={form} />
          <FlexRenderItemForm form={form} purchaseType={purchaseType} />
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Menyimpan..." : "Simpan"}
        </Button>
      </form>
    </Form>
  );
}

interface FlexRenderItemFormProps {
  form: UseFormReturn<PurchaseFormValues>;
  purchaseType: PurchaseFormValues["purchase_type"];
}
const FlexRenderItemForm: React.FC<FlexRenderItemFormProps> = ({
  form,
  purchaseType,
}) => {
  switch (purchaseType) {
    case "stock":
      return <FormPurchaseItem form={form} />;
    case "assets":
      return <FormPurchaseAssets form={form} />
    case "consumable":
      return <FormPurchaseConsumables form={form} />
    default:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Tipe Pembelian Belum diisi</CardTitle>
            <CardDescription>
              Form Item akan menyesuaikan tergantung dari jenis pembelian yang
              dipilih
            </CardDescription>
          </CardHeader>
        </Card>
      );
  }
};
