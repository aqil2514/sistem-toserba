import { useFetch } from "@/hooks/use-fetch";
import { useFloatingPopover } from "../../store/provider";
import { SERVER_URL } from "@/constants/url";
import { buildUrl } from "@/utils/build-url";
import {
  GetSummaryQuery,
  GetSummaryResponse,
} from "../../interface/sales-summary";
import { useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Calendar } from "@/components/ui/calendar";
import { SalesSummaryData } from "./sales-summary-data";

export function SalesSummaryContent() {
  const { isOpen, tabsContent } = useFloatingPopover();
  const [summaryQuery, setSummaryQuery] = useState<GetSummaryQuery>({
    endDate: new Date(),
    startDate: new Date(),
    timezone: "Asia/Jakarta",
  });

  const isCanFetch = isOpen && tabsContent === "sales-summary";

  const salesSummaryUrl = buildUrl<GetSummaryQuery>(
    `${SERVER_URL}`,
    "/sales/summary",
    summaryQuery
  );

  const fetcher = useFetch<GetSummaryResponse>(
    isCanFetch ? salesSummaryUrl : null
  );

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Calendar
          mode="range"
          defaultMonth={summaryQuery.startDate}
          selected={{
            from: summaryQuery.startDate,
            to: summaryQuery.endDate,
          }}
          onSelect={(range) => {
            const from = range?.from;
            const to = range?.to;

            if (!from) return;

            setSummaryQuery((prev) => ({
              ...prev,
              startDate: from,
              endDate: to,
            }));
          }}
          disabled={fetcher.isLoading}
          captionLayout="dropdown"
          className="rounded-lg border shadow-sm w-full md:w-fit"
        />
      </div>
      {fetcher.isLoading || !fetcher.data ? (
        <LoadingSpinner label="Mengambil ringkasan..." />
      ) : <SalesSummaryData data={fetcher.data} query={summaryQuery} /> }
    </div>
  );
}
