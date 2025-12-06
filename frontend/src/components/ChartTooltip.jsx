
import React from "react";

const ChartTooltip = ({ point, basePrice, darkMode }) => {
  if (!point) return null;

  const change = basePrice ? point.value - basePrice : 0;
  const percentChange = basePrice ? ((point.value - basePrice) / basePrice) * 100 : 0;

  return (
    <div
      className={`absolute top-2 left-2 p-2 rounded-md shadow-md text-sm z-50
                  ${darkMode ? "bg-gray-800 text-green-400" : "bg-white text-gray-800"}`}
    >
      <div>Price: ${point.value.toFixed(2)}</div>
      <div className={change >= 0 ? "text-green-500" : "text-red-500"}>
        Change: {change.toFixed(2)} ({percentChange.toFixed(2)}%)
      </div>
    </div>
  );
};

export default ChartTooltip;
