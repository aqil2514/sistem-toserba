import { ChartJSNodeCanvas } from 'chartjs-node-canvas';

export async function generatePieChartImage(
  data: { category: string; omzet: number }[],
  width = 600,
  height = 400,
  palette?: string[], // optional: array warna hex atau rgb
) {
  const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

  const total = data.reduce((sum, d) => sum + d.omzet, 0);
  const labels = data.map((d) => d.category);
  const percentages = data.map((d) => ((d.omzet / total) * 100).toFixed(1));

  // Jika palette tidak diberikan, gunakan default HSL random
  const backgroundColors =
    palette && palette.length >= data.length
      ? palette.slice(0, data.length)
      : data.map(() => `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`);

  const configuration = {
    type: 'pie' as const,
    data: {
      labels: labels.map((label, i) => `${label} (${percentages[i]}%)`),
      datasets: [
        {
          data: data.map((d) => d.omzet),
          backgroundColor: backgroundColors,
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
      },
    },
  };

  const imageBuffer = await chartJSNodeCanvas.renderToBuffer(configuration, 'image/png');
  return imageBuffer;
}
