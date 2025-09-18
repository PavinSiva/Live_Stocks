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


const chartConfig = {
  "1M": { interval: "1d" },
  "3M": { interval: "1d" },
  "6M": { interval: "1d" },
  "1Y": { interval: "1d" },
  "5Y": { interval: "1wk" },
};

const Chart = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("1M");
  const { darkMode } = useContext(ThemeContext);
  const { stockSymbol } = useContext(StockContext);

  useEffect(() => {
    if (!stockSymbol) return;

    const updateChart = async () => {
      try {
        const candles = await fetchCandles(stockSymbol, filter);
        console.log("📊 Raw backend candles:", candles);

        
        const formatted = candles.map((c) => ({
          value: Number(c.close.toFixed(2)),
          date: new Date(c.date).toLocaleDateString(), 
        }));

        console.log("✅ Formatted chart data:", formatted);
        setData(formatted);
      } catch (err) {
        console.error("Chart fetch error:", err);
        setData([]);
      }
    };

    updateChart();
  }, [stockSymbol, filter]);

  return (
    <Card>
      {/* Filter buttons */}
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

      {/* Chart */}
      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={darkMode ? "#10b981" : "rgb(199 210 254)"}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={darkMode ? "#064e3b" : "rgb(199 210 254)"}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <Area
            type="monotone"
            dataKey="value"
            stroke={darkMode ?   "#10b981" : "#312e81"}
            fillOpacity={1}
            strokeWidth={0.5}
            fill="url(#chartColor)"
          />

          <Tooltip
            contentStyle={{
              backgroundColor: darkMode ? "#1f2937" : "#fff",
              borderRadius: "0.5rem",
              border: darkMode ? "#374151" : "#e5e7eb",
            }}
            itemStyle={{ color: darkMode ? "#a5b4fc" : "#111827" }}
          />

          <XAxis dataKey="date"
          tick={{fontSize : 10}} />
          <YAxis domain={["dataMin", "dataMax"]} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default Chart;
