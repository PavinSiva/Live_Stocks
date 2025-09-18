  import axios from "axios";

  const API_BASE = "http://localhost:5000/api/stocks";

  // 🔎 Search stocks
  export const searchSymbols = async (query, signal) => {
    try {
      const res = await axios.get(`${API_BASE}/search`, {
        params: { query },
        signal,
      });
      return res.data;
    } catch (err) {
      if (axios.isCancel(err) || err.name === "CanceledError") {
        return [];
      }
      console.error("Error searching symbols:", err.message || err);
      return [];
    }
  };

  // 📊 Get stock details
  export const fetchStockDetails = async (symbol) => {
    try {
      const res = await axios.get(`${API_BASE}/${symbol}/details`);
      return res.data;
    } catch (err) {
      console.error("Error fetching stock details:", err.message || err);
      return {};
    }
  };

  // 💹 Get latest quote
  export const fetchQuote = async (symbol) => {
    try {
      const res = await axios.get(`${API_BASE}/${symbol}/quote`);
      return res.data;
    } catch (err) {
      console.error("Error fetching quote:", err.message || err);
      return {};
    }
  };


  export const fetchCandles = async (symbol, filter = "1W") => {
    try {
      // Matches backend route /:symbol/candles?filter=...
      const res = await axios.get(`${API_BASE}/${symbol}/candles`, {
        params: { filter },
      });
      return res.data; // Returns array [{time, open, high, low, close, volume}]
    } catch (err) {
      console.error("Error fetching candles:", err.message || err);
      return [];
    }
  };