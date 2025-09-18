import React, { useContext } from 'react';
import Card from './Card';
import ThemeContext from '../context/ThemeContext';

const Details = ({ details }) => {
  const { darkMode } = useContext(ThemeContext);

  const dataList = {
    name: "Name",
    country: "Country",
    currency: "Currency",
    exchange: "Exchange",
    marketCap: "Market Capitalization",
    industry: "Industry",
    sector:"Sector",
  };

  const convertMillionsTOBillions = (number) => {
    if (!number) return "--";
    return (number / 1_000_000_000).toFixed(2);
  };

  return (
    <Card>
      <ul className={`w-full h-full flex flex-col justify-between`}>
        {Object.keys(dataList).map((key) => (
          <li key={key} className="flex-1 flex justify-between items-center">
            <span>{dataList[key]}</span>
            <span>
              {key === "marketCap"
                ? `${convertMillionsTOBillions(details[key])} B`
                : details[key] ?? "--"}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default Details;
