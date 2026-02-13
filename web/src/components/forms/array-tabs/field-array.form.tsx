import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Plus, Trash } from "lucide-react";
import React, { useState } from "react";
import {
  ArrayPath,
  FieldArray,
  FieldValues,
  useFieldArray,
  UseFormReturn,
} from "react-hook-form";
import { ScrollableTabsTrigger } from "./scrollable-tabs-trigger";

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: ArrayPath<T>;
  defaultItem: FieldArray<T, ArrayPath<T>> | FieldArray<T, ArrayPath<T>>[];
  title: string;
  formComponent: (form: UseFormReturn<T>, index: number) => React.ReactNode;
}

export function FormFieldArrayTabs<T extends FieldValues>({
  form,
  name,
  defaultItem,
  title,
  formComponent,
}: Props<T>) {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name,
  });

  const isSubmitting = form.formState.isSubmitting;

  const handleRemove = (index: number) => {
    const next = fields[index - 1]?.id ?? fields[index + 1]?.id ?? null;

    remove(index);
    setActiveTab(next);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold">{title}</p>
        <Button
          onClick={() => append(defaultItem)}
          size={"icon"}
          disabled={isSubmitting}
          variant={"outline"}
          type="button"
        >
          <Plus />
        </Button>
      </div>
      <Separator />
      <Tabs
        value={activeTab ?? fields[0]?.id}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <ScrollableTabsTrigger items={fields} disabled={isSubmitting} />

        {fields.map((field, i) => {
          const component = formComponent(form, i);
          return (
            <TabsContent key={field.id} value={field.id} className="space-y-4">
              {fields.length > 1 && (
                <Button
                  variant="destructive"
                  type="button"
                  onClick={() => handleRemove(i)}
                >
                  <Trash />
                </Button>
              )}

              {component}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
