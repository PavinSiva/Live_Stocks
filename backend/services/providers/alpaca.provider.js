    // services/providers/alpaca.provider.js
    import axios from "axios";

    // ✅ Separate base URLs
    const DATA_BASE_URL = "https://data.alpaca.markets/v2";
    const TRADING_BASE_URL = "https://paper-api.alpaca.markets/v2";

    const API_KEY = "PKLX4OKRO3GT45TI11JJ";
    const SECRET_KEY = "vH1JJKnBjOmpzvSKFZNKWsDThjobEnXv4GI2zP3C";

    // 🔑 Clients
    const dataClient = axios.create({
    baseURL: DATA_BASE_URL,
    headers: {
        "APCA-API-KEY-ID": API_KEY,
        "APCA-API-SECRET-KEY": SECRET_KEY,
    },
    });

    const tradingClient = axios.create({
    baseURL: TRADING_BASE_URL,
    headers: {
        "APCA-API-KEY-ID": API_KEY,
        "APCA-API-SECRET-KEY": SECRET_KEY,
    },
    });

    // Utility to catch and log errors
    const handleError = (err) => {
    if (err.response) {
        console.error("API Error:", err.response.status, err.response.data);
        throw new Error(err.response.data.message || "API request failed");
    } else if (err.request) {
        console.error("No response from API:", err.request);
        throw new Error("No response from Alpaca API");
    } else {
        console.error("Error:", err.message);
        throw new Error(err.message);
    }
    };

    // 🔎 Search stocks by query (Trading API)
    export const searchAlpacaSymbols = async (query) => {
    try {
        const { data } = await tradingClient.get(`/assets`);
        return data
        .filter((item) => item.symbol.toLowerCase().includes(query.toLowerCase()))
        .map((item) => ({
            symbol: item.symbol,
            name: item.name,
            exchange: item.exchange,
        }));
    } catch (err) {
        handleError(err);
    }
    };

    // 📊 Get stock details (Trading API)
    export const fetchAlpacaDetails = async (symbol) => {
    try {
        const { data } = await tradingClient.get(`/assets/${symbol}`);
        return {
        name: data.name,
        currency: data.currency,
        exchange: data.exchange,
        ipo: data.ipo_date,
        marketCapitalization: data.market_cap || "N/A",
        country: data.country,
        ticker: data.symbol,
        };
    } catch (err) {
        handleError(err);
    }
    };

    // 💹 Get latest stock quote (Market Data API)
    export const fetchAlpacaQuote = async (symbol) => {
    try {
        const { data } = await dataClient.get(`/stocks/${symbol}/quotes/latest`);
        return {
        pc: data.quote.ap, // ask price
        d: data.quote.ap - data.quote.bp, // spread
        dp: ((data.quote.ap - data.quote.bp) / data.quote.bp) * 100, // % change
        };
    } catch (err) {
        handleError(err);
    }
    };

    // 🕒 Get historical candles (Market Data API)
    export const fetchAlpacaCandles = async (symbol, timeframe = "1D", start, end) => {
    try {
        const params = { timeframe };
        if (start) params.start = start;
        if (end) params.end = end;

        const { data } = await dataClient.get(`/stocks/${symbol}/bars`, { params });
        return data.bars; // array of OHLCV
    } catch (err) {
        handleError(err);
    }
    };
