
import React from "react";
import { LineChart as ReLineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const LineChart = ({ data = [], color = "#34D399" }) => {
  return (
    <div className="w-full h-24">
      <ResponsiveContainer width="100%" height="100%">
        <ReLineChart data={data}>
          <XAxis dataKey="x" hide />
          <YAxis hide />
          {/* <Tooltip /> */}
          <Line
            type="monotone"
            dataKey="y"
            stroke={color}
            strokeWidth={2}
            dot={false}
          />
        </ReLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
