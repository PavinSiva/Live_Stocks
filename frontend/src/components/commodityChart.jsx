import React from "react";
import ReactApexChart from "react-apexcharts";

export default function CommodityChart({ data }) {
  const series = [{ data }];

  const options = {
    chart: {
      type: "candlestick",
      sparkline: { enabled: true }, // removes extra paddings/axis
      height: "100%", // make it take full height of parent
      width: "100%",  // make it take full width of parent
    },
    tooltip: {
      enabled: false,
      x: { format: "HH:mm" },
      y: { formatter: (val) => val?.toFixed(2) },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#34D399",
          downward: "#F87171",
        },
      },
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      show: false, 
    },
  };

  return (
    <div className="h-full w-full">
      <ReactApexChart
        series={series}
        options={options}
        type="candlestick"
        height="100%"
        width="100%"
      />
    </div>
  );
}
