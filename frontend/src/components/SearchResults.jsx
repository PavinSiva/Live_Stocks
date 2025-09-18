import React, { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import StockContext from '../context/StockContext';

const SearchResults = ({ results = [], onSelect }) => {
  if (!results || results.length === 0) return null;

  const { darkMode } = useContext(ThemeContext);
  const {setStockSymbol} = useContext(StockContext)

  return (
    <ul className={`absolute top-12 border-2 w-full rounded-md h-64 overflow-y-scroll 
      ${darkMode ? "bg-gray-900 border-gray-800 custom-scrollbar" : "bg-white border-neutral-200 custom-scrollbar"}`}>
      
      {results.map((item , index) => (
        <li
          key={item.symbol || index }
          className={`cursor-pointer p-4 m-2 flex items-center justify-between rounded-md
            ${darkMode ? "hover:bg-indigo-600" : "hover:bg-indigo-200"}`}
          onClick={() => onSelect(item.symbol)}
        >
          <span>{item.symbol}</span>
          <span>{item.name || item.exchange}</span>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
