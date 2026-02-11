import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { KeyedMutator } from "swr";
import { MutateButton } from "@/components/ui/mutate-button";
import {
  CashCountSchemaType,
  cashCountsSchema,
  defaultCashCounts,
} from "../../../schemas/cash-counts.schema";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeaderForm } from "./header.form";
import { DetailForm } from "./detail.form";

interface Props {
  onFormSubmit: (values: CashCountSchemaType) => void;
  defaultValues?: CashCountSchemaType;
  mutate?: KeyedMutator<CashCountSchemaType>;
}

export function CashCountingForms({
  onFormSubmit,
  defaultValues,
  mutate,
}: Props) {
  const form = useForm<CashCountSchemaType>({
    resolver: zodResolver(cashCountsSchema),
    defaultValues: defaultValues ?? defaultCashCounts,
    mode: "onChange",
  });

  const isSubmitting = form.formState.isSubmitting;

  return (
    <form
      onSubmit={form.handleSubmit(onFormSubmit, (error) => {
        toast.error("Ada data yang tidak lengkap");
        console.error(error);
      })}
      className="space-y-4"
    >
      <Separator />
      {mutate && (
        <MutateButton
          mutate={mutate}
          onMutateSuccess={() => form.reset(defaultValues)}
        />
      )}

      <ScrollArea className="h-96">
        <Tabs defaultValue="header" className="w-full">
          <TabsList>
            <TabsTrigger value="header">Header</TabsTrigger>
            <TabsTrigger value="detail">Detail</TabsTrigger>
          </TabsList>
          <TabsContent value="header">
            <HeaderForm form={form} />
          </TabsContent>
          <TabsContent value="detail">
            <DetailForm form={form} defaultValues={defaultValues} />
          </TabsContent>
        </Tabs>
      </ScrollArea>
      <Separator />
      <Button disabled={isSubmitting} variant={"outline"}>
        {isSubmitting ? "Menyimpan..." : "Simpan"}
      </Button>
    </form>
  );
}
