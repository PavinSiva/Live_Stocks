import { TrendingUp, TrendingDown, Volume2 } from "lucide-react";
import LineChart from "./LineChart";

function formatNumber(num) {
  if (!num && num !== 0) return "N/A";
  if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
  return num.toFixed(2);
}

export default function SummaryCard ({
  symbol,
  name,
  price,
  change,
  changePercent,
  volume,
  marketCap,
  history = [],
  onClick,
}) {
  const safePrice = Number(price) || 0;
  const safeChange = Number(change) || 0;
  const safeChangePercent = Number(changePercent) || 0;
  const isPositive = safeChange > 0;

  return (
    <div
      className="financial-card interactive-hover cursor-pointer border-2 border-gray-800 bg-gray-950 p-4 rounded-2xl transition-shadow duration-300"
      onClick={onClick}
    >

      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-white text-lg">
              {symbol || "N/A"}
            </h3>
            {isPositive ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
          </div>
          <p className="text-sm text-gray-400 font-semibold line-clamp-1">
            {name || "Unknown Company"}
          </p>
        </div>

        
        <div className="text-right">
          <p className="financial-number text-xl text-white font-bold">
            ${safePrice.toFixed(2)}
          </p>
          <div className="space-y-1">
            <span
              className={`financial-number text-sm ${
                isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {isPositive ? "+" : ""}
              {safeChange.toFixed(2)}
            </span>
            <br />
            <span
              className={`financial-number text-sm ${
                isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              ({isPositive ? "+" : ""}
              {safeChangePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>

      
      {history.length > 0 && (
        <div className="h-24">
          <LineChart
            data={history.map((h) => ({
              x: h.time,
              y: h.close,
            }))}
            color={isPositive ? "#34D399" : "#F87171"}
          />
        </div>
      )}

      
      <div className="flex items-center justify-between pt-4 border-t border-gray-700">
        <div className="flex items-center gap-2">
          <Volume2 className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-400">Volume</span>
        </div>
        <span className="financial-number text-sm font-medium text-white">
          {formatNumber(volume)}
        </span>
      </div>

      {marketCap > 0 && (
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-gray-400">Market Cap</span>
          <span className="financial-number text-sm font-medium text-white">
            {formatNumber(marketCap)}
          </span>
        </div>
      )}
    </div>
  );
}
