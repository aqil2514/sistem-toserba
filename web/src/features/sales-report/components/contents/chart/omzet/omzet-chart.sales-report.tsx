import { GrayContainer } from "@/components/layout/container/gray-container";
import {
  LineChartData,
  MyLineChartComp,
} from "@/components/molecules/chart/line-chart/line-chart";
import { ToolTipOmzetSalesReport } from "./tool-tip-omzet.sales-report";
import { DataTable } from "@/components/organisms/custom-data-table/core-table";
import { columnsDefOmzet } from "./columns-def-omzet.sales-report";
import { useMemo } from "react";
import { ChartConfig } from "@/components/ui/chart";

interface Props {
  data: LineChartData[];
}

export function SalesReportOmzetChart({ data }: Props) {
  const chartConfig = useMemo(() => {
    const config = {} as ChartConfig;

    data.forEach((item) => {
      config[item.label] = {
        label: item.label,
        color: `green`,
      };
    });

    return config;
  }, [data]);
  return (
    <div className="w-full">
      {data.length < 2 ? (
        <GrayContainer>
          <p className="text-sm font-semibold text-center">
            Data terlalu sedikit untuk ditampilkan.
          </p>
        </GrayContainer>
      ) : (
        <>
          <MyLineChartComp
            chartData={data}
            chartConfig={chartConfig}
            ToolTipContent={(props) => <ToolTipOmzetSalesReport {...props} />}
            lineName="Omzet"
          />
          <DataTable columns={columnsDefOmzet} data={data} />
          {/* <SalesChartInsight data={data} /> */}
        </>
      )}
    </div>
  );
}

// const SalesChartInsight: React.FC<Props> = ({ data }) => {
//   if (!data.length) return null;

//   const total = data.reduce((sum, d) => sum + d.value, 0);
//   const average = Math.round(total / data.length);

//   const highest = data.reduce((a, b) => (b.value > a.value ? b : a));
//   const lowest = data.reduce((a, b) => (b.value < a.value ? b : a));

//   const isAnomaly = lowest.value < average * 0.3;

//   return (
//     <div className="mt-4 space-y-3 text-sm text-gray-700">
//       {/* Ringkasan */}
//       <p>
//         Selama periode <strong>{data[0].label}</strong> hingga{" "}
//         <strong>{data[data.length - 1].label}</strong>, omzet menunjukkan pola
//         fluktuatif dengan titik tertinggi pada <strong>{highest.label}</strong>.
//       </p>

//       {/* Highlight */}
//       <ul className="list-disc pl-5 space-y-1">
//         <li>
//           📈 <strong>Omzet tertinggi</strong>: {highest.label} (Rp{" "}
//           {highest.value.toLocaleString("id-ID")})
//         </li>
//         <li>
//           📉 <strong>Omzet terendah</strong>: {lowest.label} (Rp{" "}
//           {lowest.value.toLocaleString("id-ID")})
//         </li>
//         <li>
//           📊 <strong>Rata-rata harian</strong>: Rp{" "}
//           {average.toLocaleString("id-ID")}
//         </li>
//       </ul>

//       {/* Catatan operasional */}
//       {isAnomaly && (
//         <p className="text-yellow-700">
//           ⚠️ Terjadi penurunan omzet yang signifikan pada{" "}
//           <strong>{lowest.label}</strong>. Perlu dilakukan pengecekan untuk
//           memastikan tidak ada kendala operasional atau pencatatan transaksi.
//         </p>
//       )}
//     </div>
//   );
// };
