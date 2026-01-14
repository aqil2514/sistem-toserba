import { Button } from "@/components/ui/button";
import Link from "next/link";

export function SalesSummaryFooter() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Link href={"/sales"}>
        <Button variant={"outline"} className="w-full">
          Penjualan
        </Button>
      </Link>

      <Link href={"/sales/report"}>
        <Button variant={"outline"} className="w-full">
          Laporan
        </Button>
      </Link>
    </div>
  );
}
