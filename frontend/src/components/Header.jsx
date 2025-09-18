import React, { useEffect, useState, useContext } from "react";
import Search from "./Search";
import ThemeIcon from "./ThemeIcon";
import { getTopCompaniesData } from "../helper/fetchTopData";
import ThemeContext from "../context/ThemeContext";
import LineChart from "./LineChart";


// Logos (replace with your own images if needed)
const companyLogos = {
  AAPL: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1200px-Apple_logo_black.svg.png",
  MSFT: "https://logo.clearbit.com/microsoft.com",
  GOOGL: "https://logo.clearbit.com/google.com",
  TSLA: "https://logo.clearbit.com/tesla.com",
  META: "https://logo.clearbit.com/meta.com",
  NFLX: "https://logo.clearbit.com/netflix.com",
  DIS:"https://logo.clearbit.com/disney.com",
  COKE:"https://logo.clearbit.com/coca-cola.com",
  AMZN:"https://logo.clearbit.com/amazon.com",
  NVDA:"https://logo.clearbit.com/nvidia.com",
};

const companyLogosDark = {
  AAPL: "/Apple.png",
  MSFT: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", 
  GOOGL: "https://logo.clearbit.com/google.com",
  TSLA: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg", 
  META: "/Meta.png",
  NFLX: "https://logo.clearbit.com/netflix.com",
  DIS:"https://logo.clearbit.com/disney.com",
  COKE:"https://logo.clearbit.com/coca-cola.com",
  AMZN:"https://logo.clearbit.com/amazon.com",
  NVDA:"https://logo.clearbit.com/nvidia.com",
};
// Single Company Card Component
const CompanyCard = ({ company }) => {
  const { darkMode } = useContext(ThemeContext);
  const isPositive = company.changePercent >= 0;

  const logos = darkMode ? companyLogosDark : companyLogos;
    return (
    <div
      className={`w-[250px] flex-shrink-0 p-1 rounded-md shadow-sm shadow-gray-700 transition-colors duration-300 flex flex-col 
        ${darkMode ? "bg-gray-900 text-gray-100 " : "bg-white text-gray-900"}`}
    >
      {/* Top Row: Logo + Placeholder Chart */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex flex-col items-center w-16">

          <img
            src={logos[company.symbol] ?? "/default-logo.png"}
            alt={company.name}
            className="w-8 h-8 mb-1"
          />
          <p className="text-sm font-semibold text-center">{company.name}</p>
        </div>
        <div
          className={`flex-1 h-16 ml-3 rounded transition-colors duration-300
            ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}
        />
             <LineChart
                data={company.history} 
                  color={isPositive ? "#34D399" : "#F87171"} 
            />
      </div>

      {/* Bottom Row: Price + Change */}
      <div className="flex items-center justify-between">
        <p className="text-lg font-medium">
          ${company.price?.toFixed(2) ?? "--"}
        </p>
        <p
          className={`flex items-center text-sm font-semibold ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {isPositive ? "▲" : "▼"} {company.changePercent?.toFixed(2) ?? "--"}%
        </p>
      </div>
    </div>
  );
};

const Header = ({ name }) => {
  const [topCompanies, setTopCompanies] = useState([]);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    const fetchTop = async () => {
      const symbols = ["AAPL", "MSFT", "GOOGL", "TSLA" , "META", "NFLX" , "DIS" , "COKE" , "AMZN" , "NVDA"];
      const data = await getTopCompaniesData(symbols);
      setTopCompanies(data);
    };
    fetchTop();
  }, []);

  return (
    <div
      className={`w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-4 py-4 transition-colors duration-300
        ${darkMode ? "bg-gray-900" : "bg-white"}`}
    >
      {/* LEFT: Title + Search */}
      <div className="flex flex-col w-full md:w-[380px] flex-shrink-0">
        <h1
          className={`text-2xl font-bold break-words mb-2 transition-colors duration-300
            ${darkMode ? "text-gray-100" : "text-gray-900"}`}
        >
          {name}
        </h1>
        <Search />
      </div>

      {/* MIDDLE: Top Company Cards */}
      <div className="flex-1 w-full flex items-center overflow-x-auto scrollbar-hide py-2">
        <div className="flex gap-4">
          {topCompanies.map((company) => (
            <CompanyCard key={company.symbol} company={company} />
          ))}
        </div>
      </div>

      {/* RIGHT: Theme Toggle */}
      <div className="flex-shrink-0 ml-auto mt-2 md:mt-0">
        <ThemeIcon />
      </div>
    </div>
  );
};

export default Header;
