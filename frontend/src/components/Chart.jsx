
import React, { useContext, useState, useEffect } from "react";
import Card from "./Card";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ChartFilter from "./ChartFilter";
import ThemeContext from "../context/ThemeContext";
import StockContext from "../context/StockContext";
import { fetchCandles } from "../api/stock-api";
import RollingNumber from "./RollingNumber";

const chartConfig = {
  "1M": { interval: "1d" },
  "3M": { interval: "1d" },
  "6M": { interval: "1d" },
  "1Y": { interval: "1d" },
  "5Y": { interval: "1wk" },
};

const Chart = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("1Y");
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const { darkMode } = useContext(ThemeContext);
  const { stockSymbol } = useContext(StockContext);

  useEffect(() => {
    if (!stockSymbol) return;

    const updateChart = async () => {
      try {
        const candles = await fetchCandles(stockSymbol, filter);
        const formatted = Array.isArray(candles)
          ? candles.map((c) => ({
              value: Number(c.close.toFixed(2)),
              date: new Date(c.date).toLocaleDateString(),
            }))
          : [];
        setData(formatted);
      } catch (err) {
        console.error("Chart fetch error:", err);
        setData([]);
      }
    };

    updateChart();
  }, [stockSymbol, filter]);

  const basePrice = data.length ? data[data.length - 1].value : 0;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload;
      const change = basePrice ? point.value - basePrice : 0;
      const percentChange = basePrice
        ? ((point.value - basePrice) / basePrice) * 100
        : 0;

      return (
        <div
          className={`absolute top-0 left-20 p-1 rounded-lg z-50 min-w-[400px] 
            ${darkMode ? "bg-gray-950 text-white" : "bg-white text-black"}`}
        >
          <div className="text-xl font-semibold mb-1">Price:</div>

          <div className="flex items-center justify-start space-x-4 text-lg font-semibold w-full">

            <RollingNumber value={point.value} className="text-4xl" />

            
            <span
              className={`text-md font-semibold ${
                change >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {change >= 0 ? "+" : ""}
              {change.toFixed(2)} ({percentChange.toFixed(2)}%)
            </span>


            <span className="text-xs opacity-70">{point.date}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <div className="relative flex flex-col h-full">
        
        <ul className="flex absolute top-2 right-2 z-40 space-x-1">
          {Object.keys(chartConfig).map((item) => (
            <li key={item}>
              <ChartFilter
                text={item}
                active={filter === item}
                onClick={() => setFilter(item)}
              />
            </li>
          ))}
        </ul>

        
        <div className="mt-auto" style={{ height: "500px" }}>
          <ResponsiveContainer className="mt-auto" width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 97, right: 0, left: 0, bottom: 0 }}
              onMouseMove={(e) => {
                if (e && e.activePayload)
                  setHoveredPoint(e.activePayload[0].payload);
              }}
              onMouseLeave={() => setHoveredPoint(null)}
            >
              <defs>
                <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={darkMode ? "#10b981" : "#a78bfa"}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={darkMode ? "#064e3b" : "#a78bfa"}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <Area
                type="monotone"
                dataKey="value"
                stroke={darkMode ? "#10b981" : "#a78bfa"}
                fillOpacity={1}
                strokeWidth={2}
                fill="url(#chartColor)"
              />

              <XAxis dataKey="date" tick={{ fontSize: 10 }} interval={29} />
              <YAxis domain={["dataMin", "dataMax"]} tick={{ fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};

export default Chart;
