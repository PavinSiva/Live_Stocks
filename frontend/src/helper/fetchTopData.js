import { fetchQuote, fetchCandles } from "../api/stock-api";

export const getTopCompaniesData = async (symbols) => {
  const companies = [];

  for (const symbol of symbols) {
    try {
      const [quote, candles] = await Promise.all([
        fetchQuote(symbol),
        fetchCandles(symbol, "1Y"), 
      ]);

      companies.push({
        symbol: quote.symbol,
        name: symbol, 
        price: quote.price,
        changePercent: quote.percentChange,
        history: candles.map((c) => c.close), 
      });
    } catch (err) {
      console.error(`Error loading ${symbol}:`, err.message);
    }
  }

  return companies;
};
