import { fetchQuote, fetchCandles } from "../api/stock-api";

export const getStocksData = async (symbols) => {
  const stocks = [];

  for (const symbol of symbols) {
    try {
      const [quote, candles] = await Promise.all([
        fetchQuote(symbol),
        fetchCandles(symbol, "1Y"),
      ]);

      
      const history = (candles || []).map((c) => ({
        time: new Date(c.time * 1000), 
        open: c.open,
        high: c.high,
        low: c.low,
        close: c.close,
        volume: c.volume,
      }));

      stocks.push({
        symbol: quote.symbol || "N/A",
        name: quote.shortName || quote.longName || quote.name,
        price: quote.price || 0,
        change: quote.change || 0,
        changePercent: quote.percentChange || 0,
        volume: quote.volume || 0,
        marketCap: quote.marketCap || 0,
        history,
      });
    } catch (err) {
      console.error(`Error loading ${symbol}:`, err.message);
    }
  }

  return stocks;
};
