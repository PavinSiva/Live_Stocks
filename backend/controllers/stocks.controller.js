import {
  searchYahooStocks,
  fetchYahooStockDetails,
  fetchYahooQuote,
  fetchYahooCandles,
  fetchMarketNews,
} from "../services/providers/yahoo.provider.js";


export const searchStocks = async (req, res) => {
  try {
    const { query } = req.query; 
    if (!query) throw new Error("Query is required");

    const results = await searchYahooStocks(query);
    if (!results || results.length === 0) {
      return res.status(404).json({ error: "No symbols found" });
    }

    res.json(results);
  } catch (err) {
    console.error("Search error:", err.message);
    res.status(500).json({ error: "Search failed" });
  }
};
// Get stock details
export const getStockDetails = async (req, res) => {
  try {
    const { symbol } = req.params;
    const details = await fetchYahooStockDetails(symbol);
    res.json(details);
  } catch (err) {
    console.error("Yahoo details error:", err.message);
    res.status(500).json({ error: err.message || "Details fetch failed" });
  }
};

// Get stock quote
export const getStockQuote = async (req, res) => {
  try {
    const { symbol } = req.params;
    const quote = await fetchYahooQuote(symbol);
    res.json(quote);
  } catch (err) {
    console.error("Yahoo quote error:", err.message);
    res.status(500).json({ error: err.message || "Quote fetch failed" });
  }
};



export const getStockCandles = async (req, res) => {
  try {
    const { symbol } = req.params;
    const { filter } = req.query; // ✅ fix: take filter from query string
    const candles = await fetchYahooCandles(symbol, filter);
    res.json(candles);
  } catch (err) {
    console.error("Yahoo candles error:", err.message);
    res.status(500).json({ error: err.message || "Failed to fetch candles" });
  }
};

export const getMarketNews = async (req, res) => {
  try {
    const news = await fetchMarketNews();
    res.json(news);
  } catch (err) {
    console.error("Market news error:", err.message);
    res.status(500).json({ error: "Failed to fetch market news" });
  }
};
