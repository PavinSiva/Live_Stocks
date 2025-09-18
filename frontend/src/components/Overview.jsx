import React from 'react';
import Card from './Card';
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";

const Overview = ({name , symbol, price, change, percentChange, currency }) => {

    const isUp = change > 0;
    const currencySymbol = (amount, currencyCode) => {
    const symbols = { USD: "$", EUR: "€", GBP: "£", INR: "₹" };
    const sym = symbols[currencyCode] || currencyCode; 
    return `${sym}${amount?.toLocaleString() ?? "--"}`;
  };


  return (
    <Card>
      <div className="absolute left-2 top-2 font-bold break-words text-gray-100 text-xl xl:text-lg 2xl:text-md">
        {/* {symbol} */}{name}
      </div>
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
            {isUp ? (<p className='h-7 w-6 mr-1 '>▲</p>
            // <ArrowUpIcon className="h-7 w-6 mr-1 " />
            
          ) : (
            // <ArrowDownIcon className="h-5 w-5 mr-1" />
            <p className='h-7 w-6 mr-1'>▼</p>
          )}
          {change?.toFixed(2) ?? "--"} <span>({percentChange?.toFixed(2) ?? "--"}%)

          </span>
        </span>
      </div>
    </Card>
  );
};

export default Overview;
