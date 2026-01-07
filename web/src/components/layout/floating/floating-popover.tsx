"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info } from "lucide-react";
import { FloatingPopoverProvider, useFloatingPopover } from "./store/provider";
import { SalesSummaryContent } from "./contents/sales-summary";
import { usePathname } from "next/navigation";

const HIDE_FLOATING = ["/"];

export function FloatingPopover() {
  const pathname = usePathname();
  const isDemo = pathname.startsWith("/demo");

  if (HIDE_FLOATING.includes(pathname) || isDemo) return null;
  return (
    <FloatingPopoverProvider>
      <InnerTemplate />
    </FloatingPopoverProvider>
  );
}

const InnerTemplate = () => {
  const { isOpen, setIsOpen, setTabsContent, tabsContent } =
    useFloatingPopover();
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className=" fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg transition-all hover:scale-110 hover:shadow-xl active:scale-95"
        >
          <Info className="h-7 w-7" />
        </Button>
      </PopoverTrigger>

      <PopoverContent side="top" align="end" sideOffset={12} className="w-xl">
        <Tabs
          value={tabsContent}
          onValueChange={setTabsContent}
          className="w-full"
        >
          <TabsList>
            <TabsTrigger value="sales-summary">Sales Summary</TabsTrigger>
          </TabsList>
          <TabsContent value="sales-summary">
            <SalesSummaryContent />
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};
