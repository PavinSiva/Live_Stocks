import React, { useContext, useState, useEffect, useRef } from 'react';
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import SearchResults from './SearchResults';
import ThemeContext from '../context/ThemeContext';
import StockContext from '../context/StockContext';
import { searchSymbols } from '../api/stock-api';

const Search = () => {
  const [input, setInput] = useState("");
  const [bestMatches, setBestMatches] = useState([]);
  const [userSelectedStock, setUserSelectedStock] = useState(false); 
  const { darkMode } = useContext(ThemeContext);
  const { setStockSymbol } = useContext(StockContext);

  const abortControllerRef = useRef(null);
  const timerRef = useRef(null);

  const clear = () => {
    setInput("");
    setBestMatches([]);
    setUserSelectedStock(false); 
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const updateBestMatches = async () => {
    if (!input.trim()) return;
    if (abortControllerRef.current) abortControllerRef.current.abort();

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const results = await searchSymbols(input, controller.signal);
      const cleanedResults = results.map((r) => ({
        symbol: r.symbol,
        name: r.name || r.exchange || r.symbol,
        exchange: r.exchange || "N/A",
      }));

      setBestMatches(cleanedResults);
      setUserSelectedStock(false);
    } catch (error) {
      if (error.name === "CanceledError") return;
      console.error("Search error:", error.message || error);
      setBestMatches([]);
    }
  };

  const handleSelectStock = (symbol) => {
    setInput(symbol);
    setBestMatches([]);
    setStockSymbol(symbol);
    setUserSelectedStock(true); 
      if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  };

  useEffect(() => {
    if (!input.trim()) {
      setBestMatches([]);
      setUserSelectedStock(false);
      return;
    }

    
    if (!userSelectedStock) {
      timerRef.current = setTimeout(() => {
        updateBestMatches();
        timerRef.current = null;
      }, 500);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [input, userSelectedStock]);

  return (
    <div className={`flex items-center my-4 border-2 rounded-md relative z-50 w-96 
      ${darkMode ? "bg-black border-gray-800" : "bg-white border-neutral-200"}`}>

      <input
        type="text"
        value={input}
        className={`w-full px-4 py-2 focus:outline-none rounded-md ${darkMode ? "bg-black" : ""}`}
        placeholder="Search Stock..."
        onChange={(e) => {
          setInput(e.target.value);
          setUserSelectedStock(false); 
        }}
        onKeyDown={(e) => e.key === "Enter" && updateBestMatches()}
      />

      {input && (
        <button onClick={clear} className="m-1">
          <XMarkIcon className="h-4 w-4 fill-gray-500" />
        </button>
      )}

      <button
        onClick={updateBestMatches}
        className={`h-8 w-8 rounded-md flex justify-center items-center m-1 p-2
          ${darkMode ?  "bg-emerald-500": "bg-indigo-600"}`}
      >
        <MagnifyingGlassIcon className="h-4 w-4 fill-gray-100" />
      </button>

      {input && bestMatches.length > 0 && !userSelectedStock && (
        <SearchResults results={bestMatches} onSelect={handleSelectStock} />
      )}
    </div>
  );
};

export default Search;
