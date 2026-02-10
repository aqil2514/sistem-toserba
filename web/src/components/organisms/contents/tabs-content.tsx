import { LabelValue } from "@/@types/general";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

export interface TabsContentType<
  T extends string = string,
> extends LabelValue<T> {
  content: React.ReactNode;
}

interface Props<T extends string = string> {
  value: T;
  onValueChange: (state: T) => void;
  tabContents: TabsContentType<T>[];
}

export function TabsContentData<T extends string = string>({
  onValueChange,
  tabContents,
  value,
}: Props<T>) {
  return (
    <Tabs
      value={value}
      onValueChange={(e) => onValueChange(e as T)}
      className="w-full"
    >
      <TabsList>
        {tabContents.map((content) => (
          <TabsTrigger value={content.value} key={content.value}>
            {content.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabContents.map((content) => (
        <TabsContent key={content.value} value={content.value}>
          {content.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
