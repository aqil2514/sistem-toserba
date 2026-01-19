import QuickChart from 'quickchart-js';

export async function generatePieChartImageQuickChart(
  data: { category: string; omzet: number }[],
  width = 600,
  height = 400,
  palette?: string[],
) {
  const total = data.reduce((sum, d) => sum + d.omzet, 0);
  const labels = data.map((d) => d.category);
  const percentages = data.map((d) => ((d.omzet / total) * 100).toFixed(1));
  const chartPalette =
    palette?.slice(0, data.length) ||
    data.map(() => `hsl(${Math.floor(Math.random() * 360)},70%,60%)`);

  const qc = new QuickChart();
  qc.setConfig({
    type: 'pie',
    data: {
      labels: labels.map((label, i) => `${label} (${percentages[i]}%)`),
      datasets: [
        { data: data.map((d) => d.omzet), backgroundColor: chartPalette },
      ],
    },
    options: {
      plugins: { legend: { display: false } },
    },
  });
  qc.setWidth(width);
  qc.setHeight(height);
  qc.setBackgroundColor('transparent');

  // ambil buffer PNG
  const chartBuffer = await qc.toBinary();
  return chartBuffer;
}
