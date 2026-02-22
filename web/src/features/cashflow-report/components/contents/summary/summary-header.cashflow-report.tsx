import { DailyCashflowSummaryRow } from "@/features/cashflow-report/types/cashflow-report-api-return.types";

interface Props {
  data: DailyCashflowSummaryRow[];
}

export function CashflowReportHeaderSummary({ data }: Props) {
  if (!data || data.length === 0) return null;

  const {
    total_income_period,
    total_expense_period,
    total_receivable_period,
    total_payable_period,
  } = data[0];

  const netCashPeriod = total_income_period - total_expense_period;

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      <SummaryItem
        label="Total Income"
        value={total_income_period}
        variant="positive"
      />

      <SummaryItem
        label="Total Expense"
        value={total_expense_period}
        variant="negative"
      />

      <SummaryItem
        label="Net Cash"
        value={netCashPeriod}
        variant={netCashPeriod >= 0 ? "positive" : "negative"}
      />

      <SummaryItem
        label="Total Piutang"
        value={total_receivable_period}
        variant="neutral"
      />

      <SummaryItem
        label="Total Utang"
        value={total_payable_period}
        variant="neutral"
      />
    </div>
  );
}

interface SummaryItemProps {
  label: string;
  value: number;
  variant?: "positive" | "negative" | "neutral";
}

function SummaryItem({ label, value, variant = "neutral" }: SummaryItemProps) {
  const colorMap = {
    positive: "text-green-600",
    negative: "text-red-600",
    neutral: "text-gray-900",
  };

  return (
    <div className="rounded-lg border p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`text-xl font-semibold ${colorMap[variant]}`}>
        {formatCurrency(value)}
      </p>
    </div>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}
