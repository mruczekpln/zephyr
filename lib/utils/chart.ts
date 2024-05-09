import { UserSettings } from "@/types";

export function getChartUrl(
  tempsDataset: number[],
  unit: UserSettings["unit"]
) {
  const CHART_TEMPLATE = `{ 
    type: "sparkline",
    data: {
      datasets: [
        {
          data: [${tempsDataset.toString()}],
          fill: false,
          borderWidth: 3,
          borderColor: "rgba(0, 0, 0, 0.2)",
        },
      ],
    },
    options: {
      layout: {
        padding: 100,
      },
      plugins: {
        datalabels: {
          anchor: "end",
          align: "top",
          color: "rgba(0, 0, 0, 0.3)",

          formatter: (value) => {
            return value + " °${unit === "metric" ? "C" : "F"}";
          },
          font: {
            size: 24,
          },
        },
      },
      scales: {
        yAxes: [
          {
            display: false,
            ticks: {
              min: ${unit === "metric" ? "-5" : "-15"},
              max: ${unit === "metric" ? "30" : "100"},
            },
          },
        ],
      },
    },
  }` as const;

  return (
    "'https://quickchart.io/chart?" +
    encodeURI("w=1280&h=720&bkg=rgba(255, 255, 255, 0)&c=") +
    encodeURIComponent(CHART_TEMPLATE) +
    "'"
  );
}
