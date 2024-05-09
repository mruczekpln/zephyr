export function getChartUrl(tempsDataset: number[]) {
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
            return value + " °C";
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
              min: 0,
              max: 30,
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
