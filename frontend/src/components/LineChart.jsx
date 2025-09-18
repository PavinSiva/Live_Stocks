    // LineChart.js
    import React from "react";
    import { LineChart as ReLineChart, Line, ResponsiveContainer } from "recharts";

    const LineChart = ({ data, color = "#34D399" }) => {
        
    const chartData = data?.map((value, index) => ({ value, index })) || [];

    return (
        <div className="w-full h-24">
        <ResponsiveContainer width="100%" height="100%">
            <ReLineChart data={chartData}>
            <Line
                type="monotone"
                dataKey="value"
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
