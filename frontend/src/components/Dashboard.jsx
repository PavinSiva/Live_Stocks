
import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import Details from "./Details";
import Overview from "./Overview";
import TradePanel from "./TradePanel";
import Chart from "./Chart";
import ThemeContext from "../context/ThemeContext";
import StockContext from "../context/StockContext";
import { fetchStockDetails, fetchQuote } from "../api/stock-api";
import AppSidebar from "./AppSidebar";

const Dashboard = () => {
  const { darkMode } = useContext(ThemeContext);
  const { stockSymbol } = useContext(StockContext);

  const [stockDetails, setStockDetails] = useState({});
  const [tradeMode, setTradeMode] = useState(false);
  const [quote, setQuote] = useState({});

  useEffect(() => {
    if (!stockSymbol) return;

    const fetchDetails = async () => {
      try {
        const details = await fetchStockDetails(stockSymbol);
        setStockDetails(details || {});
      } catch (error) {
        console.error("Error fetching stock details:", error);
        setStockDetails({});
      }
    };

    const fetchPrice = async () => {
      try {
        const data = await fetchQuote(stockSymbol);
        setQuote({
          price: data?.price,
          change: data?.change,
          percentChange: data?.percentChange,
          currency: data?.currency,
          symbol: data?.symbol,
        });
      } catch (error) {
        console.error("Error fetching quote:", error);
        setQuote({});
      }
    };

    fetchDetails();
    fetchPrice();
  }, [stockSymbol]);

  return (
    <div
      className={`h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-quicksand ${darkMode ? "bg-black text-gray-300" : "bg-white"
        }`}

    >


      <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center">
        <Header
          name={stockDetails?.name || "Select a stock"}
          tradeMode={tradeMode}
          onToggleTrade={() => setTradeMode((prev) => !prev)}
        />

      </div>


      <div className="md:col-span-2 row-span-4">
        <Chart />
      </div>

      {!tradeMode && (
        <div>
          <Overview
            name={stockDetails?.name || "Select a stock"}
            symbol={quote?.symbol || stockSymbol || "N/A"}
            price={quote?.price ?? "--"}
            change={quote?.change ?? 0}
            percentChange={quote?.percentChange ?? 0}
            currency={quote?.currency || stockDetails?.currency || "USD"}
          />
        </div>
      )}


      {!tradeMode && (
        <div className="row-span-2 xl:row-span-3 xl:col-span-1">
          <Details details={stockDetails} />
        </div>
      )}

      {tradeMode && (
        <div className="row-span-4 xl:col-span-1">
          <TradePanel
            name={stockDetails?.name || "Select a stock"}
            symbol={quote?.symbol || stockSymbol}
            change={quote?.change ?? 0}
            percentChange={quote?.percentChange ?? 0}
            price={quote?.price}
          />
        </div>
      )}

    </div>
  );
};

export default Dashboard;
