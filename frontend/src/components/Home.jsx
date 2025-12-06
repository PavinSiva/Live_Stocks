import AppSidebar from "./AppSidebar";
import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";
import { TrendingUp, TrendingDown, DollarSign, BarChart2 } from "lucide-react";
import { fetchTopMovers } from "../api/stock-api";
import StockCard from "./StockCard";

export default function Home() {
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStock, setSelectedStock] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTopMovers();
        setMarketData(data);
      } catch (err) {
        console.error("Failed to fetch top movers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  
  const topGainers = marketData?.topGainers || [];
  const topLosers = marketData?.topLosers || [];
  const totalMarketCap = marketData?.totalMarketCap || 0;
  const totalVolume = marketData?.totalVolume || 0;

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

        
        <div className="flex-1 overflow-auto p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl text-white font-bold tracking-tight">
                Market Overview
              </h1>
              <p className="text-muted-foreground mt-3 font-semibold text-gray-500">
                Real-time market data and your trading dashboard
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground font-semibold text-gray-500">
                Last Updated
              </p>
              <p className="font-medium text-white">
                {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>

          
          {loading ? (
            <p className="text-center mt-10 text-white font-semibold text-lg">
              Loading market data...
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4 mt-6">
               <SummaryCard
  symbol="Market Cap"
  name="Global Markets"
  price={totalMarketCap}
  change={0}
  changePercent={0}
  volume={0}
/>

                
<SummaryCard
  symbol="Total Volume"
  name="24h Volume"
  price={totalVolume}
  change={0}
  changePercent={0}
  volume={0}
/>

                {topGainers.length > 0 && (
  <SummaryCard
    symbol={topGainers[0].symbol}
    name={topGainers[0].name}
    price={topGainers[0].price}
    change={topGainers[0].change}
    changePercent={topGainers[0].percentChange}
    volume={topGainers[0].volume}
    marketCap={topGainers[0].marketCap}
    history={topGainers.map((g, i) => ({ time: i, close: g.price }))}
  />
)}

                
{topLosers.length > 0 && (
  <SummaryCard
    symbol={topLosers[0].symbol}
    name={topLosers[0].name}
    price={topLosers[0].price}
    change={topLosers[0].change}
    changePercent={topLosers[0].percentChange}
    volume={topLosers[0].volume}
    marketCap={topLosers[0].marketCap}
    history={topLosers.map((l, i) => ({ time: i, close: l.price }))}
  />
)}
              </div>


              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-4 mt-6">
                
                <div className="lg:col-span-1 space-y-4 animate-slide-up border-2 border-gray-900 bg-gray-950 p-4 rounded-2xl">
                  <h2 className="flex justify-center text-xl font-semibold text-white">
                    Top Gainers
                  </h2>
                  <div className="space-y-4">
                    {topGainers.slice(0, 5).map((stock) => (
                      <StockCard
                        key={stock.symbol}
                        symbol={stock.symbol}
                        name={stock.name}
                        price={stock.price}
                        change={stock.change}
                        changePercent={stock.percentChange}
                        volume={stock.volume}
                        marketCap={stock.marketCap}
                        onClick={() => setSelectedStock(stock)}
                      />
                    ))}
                  </div>
                </div>

                
                <div className="lg:col-span-1 space-y-4 animate-slide-up border-2 border-gray-900 bg-gray-950 p-4 rounded-2xl">
                  <h2 className="flex justify-center text-xl font-semibold text-white">
                    Top Losers
                  </h2>
                  <div className="space-y-4">
                    {topLosers.slice(0, 5).map((stock) => (
                      <StockCard
                        key={stock.symbol}
                        symbol={stock.symbol}
                        name={stock.name}
                        price={stock.price}
                        change={stock.change}
                        changePercent={stock.percentChange}
                        volume={stock.volume}
                        marketCap={stock.marketCap}
                        onClick={() => setSelectedStock(stock)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
