import yahooFinance from "yahoo-finance2";

// 🔎 Search stocks
export const searchYahooStocks = async (query) => {
  if (!query) throw new Error("Query is required");

  const data = await yahooFinance.search(query);

  if (!data || !data.quotes || data.quotes.length === 0) {
    return [];
  }

  return data.quotes.map((item) => ({
    symbol: item.symbol,
    name: item.shortname || item.longname || item.symbol,
    exchange: item.exchDisp || item.exchange,
  }));
};

// 📊 Get stock details
export const fetchYahooStockDetails = async (symbol) => {
  if (!symbol) throw new Error("Symbol is required");

  const data = await yahooFinance.quoteSummary(symbol, {
    modules: ["price", "summaryProfile"],
  });

  const result = data?.price;
  const profile = data?.summaryProfile;

  if (!result) throw new Error("No details found");

  return {
    name: result.longName || symbol,
    currency: result.currency || "N/A",
    exchange: result.exchangeName || "N/A",
    marketCap: result.marketCap || 0,
    country: profile?.country || "N/A",
    industry: profile?.industry || "N/A",
    sector: profile?.sector || "N/A",
  };
};

// 💲 Live quote
export const fetchYahooQuote = async (symbol) => {
  if (!symbol) throw new Error("Symbol is required");

  const quote = await yahooFinance.quote(symbol);

  if (!quote) throw new Error("No quote found");

  return {
    symbol: quote.symbol,
    price: quote.regularMarketPrice,
    change: quote.regularMarketChange,
    percentChange: quote.regularMarketChangePercent,
    currency: quote.currency,
  };
};

// 📈 Candles (CHART API ONLY — historical REMOVED)
export const fetchYahooCandles = async (symbol, filter) => {
  if (!symbol || !filter) throw new Error("Symbol and filter are required");

  const now = Math.floor(Date.now() / 1000);
  let period1, interval;

  switch (filter) {
    case "1M":
      interval = "1d";
      period1 = now - 30 * 24 * 60 * 60;
      break;

    case "3M":
      interval = "1d";
      period1 = now - 90 * 24 * 60 * 60;
      break;

    case "6M":
      interval = "1d";
      period1 = now - 180 * 24 * 60 * 60;
      break;

    case "1Y":
      interval = "1d";
      period1 = now - 365 * 24 * 60 * 60;
      break;

    case "5Y":
      interval = "1wk";
      period1 = now - 5 * 365 * 24 * 60 * 60;
      break;

    default:
      throw new Error("Invalid filter");
  }

  const chartData = await yahooFinance.chart(symbol, {
    period1,
    period2: now,
    interval,
  });

  if (!chartData?.timestamp?.length) {
    throw new Error("No candles found");
  }

  return chartData.timestamp.map((t, i) => ({
    time: t,
    open: chartData.indicators.quote[0].open[i],
    high: chartData.indicators.quote[0].high[i],
    low: chartData.indicators.quote[0].low[i],
    close: chartData.indicators.quote[0].close[i],
    volume: chartData.indicators.quote[0].volume[i],
  }));
};

// 📰 Market news
export const fetchMarketNews = async () => {
  const queries = [
    "stock market",
    "NASDAQ",
    "S&P 500",
    "US economy",
    "Federal Reserve",
  ];

  const results = await Promise.all(
    queries.map((q) => yahooFinance.search(q))
  );

  const news = results.flatMap((r) => r.news || []);

  const uniqueNews = Object.values(
    news.reduce((acc, item) => {
      acc[item.uuid] = item;
      return acc;
    }, {})
  );

  uniqueNews.sort(
    (a, b) =>
      new Date(b.providerPublishTime) -
      new Date(a.providerPublishTime)
  );

  return uniqueNews.slice(0, 30);
};
