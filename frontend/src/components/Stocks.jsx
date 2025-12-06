import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import StockCard from "./StockCard";
import AppSidebar from "./AppSidebar";
import { getStocksData } from "../helper/fetchStocksData";
import StockContext from "../context/StockContext";

export default function Stocks() {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setStockSymbol } = useContext(StockContext);

  
  const symbols = [
    "AAPL", "MSFT", "AMZN", "GOOGL", "FB", "TSLA", "NVDA", "JPM",
    "V", "PG", "JNJ", "DIS", "NFLX", "ADBE", "INTC", "KO",
    "CSCO", "XOM", "WMT", "CVX"
  ];

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const data = await getStocksData(symbols);
        setStocks(data);
      } catch (err) {
        console.error("Failed to fetch stocks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  const handleCardClick = async(symbol) => {
    await setStockSymbol(symbol);
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen flex w-full bg-gray-950">
      <AppSidebar />

      <main className="flex-1 flex flex-col overflow-hidden">

        <header className="h-16 border-b border-gray-800 bg-black shadow-sm">
          <div className="flex h-full items-center justify-between px-6">
            <h1 className="text-xl font-semibold text-white">
              Financial Dashboard
            </h1>
            <div className="flex items-center gap-2 text-sm">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-white">Live Data</span>
            </div>
          </div>
        </header>

        
        <div className="space-y-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Top Stocks
              </h1>
              <p className="text-gray-400 mt-1">
                Track the performance of leading stocks in the market
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Market Status</p>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-medium text-sm text-white">Open</span>
              </div>
            </div>
          </div>

          
          {loading ? (
            <p className="text-white mt-6">Loading stocks...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {stocks.map((stock) => (
                <StockCard
                  key={stock.symbol}
                  symbol={stock.symbol || "N/A"}
                  name={stock.name || "Unknown"}
                  price={stock.price || 0}
                  change={stock.change || 0}
                  changePercent={stock.changePercent || 0}
                  volume={stock.volume || 0}
                  marketCap={stock.marketCap || 0}
                  history={stock.history || []} 
                  onClick={() => handleCardClick(stock.symbol)}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
