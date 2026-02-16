"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { MutateButton } from "@/components/ui/mutate-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SERVER_URL } from "@/constants/url";
import { SalesHeader } from "@/features/sales/types/sales-header";
import { useFetch } from "@/hooks/use-fetch";
import { formatDate } from "@/utils/format-date.fns";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { ExternalLink, Pen, Trash } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

export function SalesCard() {
  const { data, isLoading, mutate } = useFetch<SalesHeader[]>(
    `${SERVER_URL}/dashboard/sales`,
  );

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      const { type } = event.data;
      if (type === "ADD_SALES_SUCCESS") {
        toast.success("Data penjualan berhasil ditambah");
        mutate();
      }
      if (type === "DELETE_SALES_SUCCESS") {
        toast.success("Data penjualan berhasil dihapus");
        mutate();
      }
      if (type === "EDIT_SALES_SUCCESS") {
        toast.success("Data penjualan berhasil diedit");
        mutate();
      }
    };

    window.addEventListener("message", handleMessage);

    return () => window.removeEventListener("message", handleMessage);
  }, [mutate]);

  const serverData = data ?? [];

  const addHandler = () => {
    window.open("/sales?action=add", "_blank", "width=800,height=600");
  };

  const deleteHandler = (id: string) => {
    window.open(
      `/sales?action=delete&id=${id}`,
      "_blank",
      "width=800,height=600",
    );
  };

  const editHandler = (id: string) => {
    window.open(
      `/sales?action=edit&id=${id}`,
      "_blank",
      "width=800,height=600",
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Penjualan</CardTitle>
        <CardDescription>
          Per : {formatDate(new Date(), "Senin, 29 Desember 2025")}
        </CardDescription>
        <CardAction>
          <MutateButton mutate={mutate} />
        </CardAction>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-4">
        <ScrollArea className="h-72">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="space-y-4">
              {serverData.map((item) => {
                const badgeLabel: Record<string, string> = {
                  cash: "Tunai",
                  digital: "Digital",
                  utang: "Utang",
                };
                return (
                  <div key={item.id} className="border rounded-2xl p-4">
                    <div className="flex justify-between">
                      <p className="text-sm font-bold mt-2 text-muted-foreground">
                        {item.sales_code}
                      </p>
                    </div>
                    <div className="flex justify-end gap-4 mt-4">
                      <Badge variant={"destructive"}>
                        {badgeLabel[item.payment_method]}
                      </Badge>
                    </div>

                    <p className="text-sm font-bold text-muted-foreground">
                      {formatDate(
                        item.created_at,
                        "Senin, 29 Desember 2025, 09:21",
                      )}
                    </p>
                    <Separator className="my-2" />
                    <div className="flex justify-between">
                      <p className="font-semibold text-muted-foreground">
                        {item.customer_name}
                      </p>

                      <p className="text-sm font-semibold text-muted-foreground">
                        {formatRupiah(item.total_amount)}
                      </p>
                    </div>
                    <Separator className="my-2" />
                                          <div className="flex gap-2">
                        <a
                          href={`/sales?action=detail&id=${item.id}`}
                          target="_blank"
                        >
                          <Button variant={"outline"} size={"icon-sm"}>
                            <ExternalLink />
                          </Button>
                        </a>
                        <Button
                          onClick={() => deleteHandler(item.id)}
                          variant={"destructive"}
                          size={"icon-sm"}
                        >
                          <Trash />
                        </Button>
                        <Button
                          onClick={() => editHandler(item.id)}
                          variant={"outline"}
                          size={"icon-sm"}
                        >
                          <Pen />
                        </Button>
                      </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <Separator />
      <CardFooter>
        <Button variant={"outline"} onClick={addHandler}>
          Tambah Baru
        </Button>
      </CardFooter>
    </Card>
  );
}
