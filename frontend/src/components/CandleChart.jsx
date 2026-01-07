import React from "react";
import ReactApexChart from "react-apexcharts";

const CandleChart = ({ data, darkMode }) => {

  const candleSeries = [
    {
      data: data.map((c) => ({
        x: new Date(c.date).getTime(),
        y: [c.open, c.high, c.low, c.close],
      })),
    },
  ];

  // Prepare series for brush chart (bar chart of close prices)
  const brushSeries = [
    {
      data: data.map((c) => ({
        x: new Date(c.date).getTime(),
        y: c.close,
      })),
    },
  ];

  const candleOptions = {
    chart: {
      id: "mainChart",
      type: "candlestick",
      background: darkMode ? "#000000" : "#fff",
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
      zoom: {
        enabled: true,
        type: "xy",
        autoScaleYaxis: true,
      },
      animations: {
        enabled: true,
        speed: 100,
        easing: "easeinout",
        dynamicAnimation: { speed: 550 },
      },
      plotOptions: {
        candlestick: { distributed: false },
      },
    },
    stroke: { curve: "smooth", width: 1 },
    dataLabels: { enabled: false },
    grid: {
      borderColor: darkMode ? "#333" : "#ccc",
      row: { colors: ["transparent"], opacity: 0.5 },
    },
    xaxis: { type: "datetime", labels: { style: { colors: darkMode ? "#fff" : "#000" } }, tooltip: { enabled: true } },
    yaxis: { labels: { style: { colors: darkMode ? "#fff" : "#000" }, formatter: (val) => val.toFixed(2) }, tooltip: { enabled: true } },
    tooltip: {
      enabled: true,
      shared: true,
      followCursor: false,
      fixed: { enabled: true, position: "topLeft", offsetX: 10, offsetY: 10 },
      custom: ({ series, seriesIndex, dataPointIndex, w }) => {
        const c = dataPointIndex != null ? w.globals.initialSeries[seriesIndex].data[dataPointIndex] : data[data.length - 1];
        const color = c.y[3] >= c.y[0] ? "#4caf50" : "#f44336";
        return `
          <div style="
            padding: 5px 5px;
            background: ${darkMode ? "#111" : "#fff"};
            min-width: 300px;
            max-width: 300px;
            border-radius: 5px;
            display: flex;
            gap: 15px;
            font-size: 13px;
            color: ${darkMode ? "#fff" : "#000"};
            white-space: nowrap;
          ">
            <span style="color:${color}"><strong style="color:#fff">O:</strong> ${c.y[0].toFixed(2)}</span>
            <span style="color:${color}"><strong style="color:#fff">H:</strong> ${c.y[1].toFixed(2)}</span>
            <span style="color:${color}"><strong style="color:#fff">L:</strong> ${c.y[2].toFixed(2)}</span>
            <span style="color:${color}"><strong style="color:#fff">C:</strong> ${c.y[3].toFixed(2)}</span>
          </div>
        `;
      },
    },
  };


  const brushOptions = {
    chart: {
      id: "brushChart",
      height: 100,
      type: "bar",
      brush: { target: "mainChart", enabled: true },
      selection: { enabled: true, fill: { color: darkMode ? "#000" : "#ccc", opacity: 0.6 }, stroke: { color: darkMode ? "#888" : "#0d6efd" } },
      toolbar: { show: false },
    },
    stroke: { width: 0.1 },
    colors: ["crimson"],
    fill: { color: darkMode ? "#888" : "#0d6efd" },
    xaxis: { type: "datetime", labels: { style: { colors: darkMode ? "#fff" : "#000" } }, tooltip: { enabled: true } },
    yaxis: { tickAmount: 2 ,   labels: { style: { colors: darkMode ? "#fff" : "#000" }, formatter: (val) => val.toFixed(2) }, tooltip: { enabled: true }   },
    grid: { show: false },
  };

  return (
    <div>
    
      <ReactApexChart options={candleOptions} series={candleSeries} type="candlestick" height={280} />
  
      <ReactApexChart options={brushOptions} series={brushSeries} type="bar" height={120} />
   
      <style>{`
        .apexcharts-toolbar {
          right: 50% !important;
          transform: translateX(50%);
          top: 10px !important;
          gap : 5px;
          color : black;
        }
        .apexcharts-toolbar button {
          margin: 0 10px;
        }
      `}</style>
    </div>
  );
};

export default CandleChart;
