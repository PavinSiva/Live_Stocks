
import React from "react";
import Card from "./Card";

const Overview = ({ name, symbol, price, change, percentChange, currency }) => {
  const isUp = change > 0;

  const currencySymbol = (amount, currencyCode) => {
    const symbols = { USD: "$", EUR: "€", GBP: "£", INR: "₹" };
    const sym = symbols[currencyCode] || currencyCode;
    return `${sym}${amount?.toLocaleString() ?? "--"}`;
  };

  return (
    <Card>
      {/* <div className="absolute break-words flex flex-col top-1 text-neutral-400 text-xl xl:text-sm 2xl:text-md">
        {symbol}
      </div> */}
      <div className="h-full w-full flex items-center justify-evenly">
        <span className="text-2xl xl:text-4xl 2xl:text-4xl flex items-center font-semibold">
          {currencySymbol(price, currency)}
          <span className="text-lg xl:text-md 2xl:text-sm text-neutral-400 m-2">
            {currency ?? ""}
          </span>
        </span>
        <span
          className={`text-md xl:text-lg 2xl:text-xl flex font-semibold ${
            isUp ? "text-green-500" : "text-red-500"
          }`}
        >
          {isUp ? <p className="h-7 w-6 mr-1">▲</p> : <p className="h-7 w-6 mr-1">▼</p>}
          {change?.toFixed(2) ?? "--"} ({percentChange?.toFixed(2) ?? "--"}%)
        </span>
      </div>
    </Card>
  );
};

export default Overview;
