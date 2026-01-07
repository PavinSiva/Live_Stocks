import { TrendingUp, TrendingDown } from "lucide-react";
import CommodityChart from "./commodityChart";

export default function CommodityCard({
    icon,
    name,
    ticker,
    price,
    change,
    changePercent,
    history = [],
    onClick,
}) {
    const p = Number(price) || 0;
    const ch = Number(change) || 0;
    const chp = Number(changePercent) || 0;
    const isUp = ch > 0;
    const trendColor = isUp ? "#34D399" : "#F87171";
    console.log(history)

    return (
        <div
            onClick={onClick}
            className=" mx-0 mt-4 border-2  border-zinc-800 bg-black p-4 rounded-xl cursor-pointer hover:scale-[1.01] transition-all"
        >
            {/* ICON + PRICE + CHANGE */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img
                        src={icon}
                        alt={name}
                        className="w-14 h-14 rounded-lg object-contain"
                    />
                </div>

                <div className="text-right">
                    <p className="text-xl font-bold text-white">
                        ${p.toFixed(2)}
                    </p>
                    <p className={`text-sm ${isUp ? "text-green-400" : "text-red-400"}`}>
                        {isUp ? "+" : ""}
                        {ch.toFixed(2)} ({chp.toFixed(2)}%)
                    </p>
                </div>
            </div>

            {/* TICKER + TREND ICON */}
            <div className="flex items-center justify-between mt-3">
                <span className="text-gray-300 font-semibold text-sm">{name}</span>
                {isUp ? (
                    <TrendingUp className="w-4 h-4 text-green-400" />
                ) : (
                    <TrendingDown className="w-4 h-4 text-red-400" />
                )}
                
            </div>

            {/* MINI CHART */}
            {history.length > 0 && (
                <div className="mt-3 h-30 w-full bg-black p-2 border border-zinc-800 rounded-lg">

                    <CommodityChart
                        data={history.map((h, idx) => ({
                            x: Date.now() + idx * 60000, 
                            y: [Number(h.open), Number(h.high), Number(h.low), Number(h.close)],
                        }))}
                    />

                </div>
            )}
        </div>
    );
}
