import {
  MyPieChartComp,
  PieChartData,
} from "@/components/molecules/chart/pie-chart";
import React from "react";

interface Props {
  data: PieChartData[];
}

export function SalesReportPerCategoryChart({ data }: Props) {
  return (
    <div>
      <MyPieChartComp data={data} />;
      <SalesCategoryInsight data={data} />
    </div>
  );
}

const SalesCategoryInsight: React.FC<Props> = ({ data }) => {
  if (!data.length) return null;

  const total = data.reduce((sum, d) => sum + d.value, 0);

  const sorted = [...data].sort((a, b) => b.value - a.value);
  const top = sorted[0];
  const bottom = sorted[sorted.length - 1];

  const topPercentage = ((top.value / total) * 100).toFixed(1);

  const isDominant = top.value / total > 0.5;

  return (
    <div className="mt-4 space-y-3 text-sm text-gray-700">
      {/* Ringkasan */}
      <p>
        Distribusi omzet menunjukkan bahwa kategori <strong>{top.name}</strong>{" "}
        memberikan kontribusi terbesar terhadap total penjualan.
      </p>

      {/* Highlight */}
      <ul className="list-disc pl-5 space-y-1">
        <li>
          🥇 <strong>Kategori terbesar</strong>: {top.name} (Rp{" "}
          {top.value.toLocaleString("id-ID")} • {topPercentage}%)
        </li>
        <li>
          📊 <strong>Total omzet</strong>: Rp {total.toLocaleString("id-ID")}
        </li>
        <li>
          🔻 <strong>Kategori terkecil</strong>: {bottom.name} (Rp{" "}
          {bottom.value.toLocaleString("id-ID")})
        </li>
      </ul>

      {/* Catatan operasional */}
      {isDominant && (
        <p className="text-yellow-700">
          ⚠️ Ketergantungan terhadap kategori <strong>{top.name}</strong> cukup
          tinggi ({topPercentage}% dari total omzet). Perlu dipertimbangkan
          strategi diversifikasi penjualan.
        </p>
      )}
    </div>
  );
};
