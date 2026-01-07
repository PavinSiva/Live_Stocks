import React, { useContext, useState, useMemo } from "react";
import ThemeContext from "../context/ThemeContext";

const TradePanel = ({ name, symbol, price, change = 0, percentChange = 0, balance = 10000 }) => {
    const { darkMode } = useContext(ThemeContext);
    const [side, setSide] = useState("BUY");
    const [quantity, setQuantity] = useState("");

    const qty = Number(quantity) || 0;

    const tradeValue = useMemo(() => {
        if (!price || qty <= 0) return 0;
        return qty * price;
    }, [price, qty]);

    const insufficient = side === "BUY" && tradeValue > balance;

    const isPositive = change >= 0;

    return (
        <div
            className={`h-full w-full rounded-xl border flex flex-col
        ${darkMode
                    ? "bg-[#0B0E11] border-gray-800 text-gray-200"
                    : "bg-white border-gray-200 text-gray-900"
                }`}
        >
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-700/40">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">{name}</h2>
                    <span
                        className={`text-sm font-semibold ${isPositive ? "text-green-400" : "text-red-500"
                            }`}
                    >
                        {isPositive ? "▲" : "▼"} {change.toFixed(2)} ({percentChange.toFixed(2)}%)
                    </span>
                </div>
                <p className="text-sm mt-1 text-gray-400">
                    Paper Trading
                </p>
            </div>



            <div className="relative w-full px-6 pt-4">
                <div
                    className={`relative flex w-full rounded-full border border-gray-400 dark:border-gray-700`}
                >

                    <div
                        className={`absolute top-0 left-0 h-full w-1/2 rounded-full transition-transform duration-300
        ${side === "BUY" ? "translate-x-0 bg-green-800" : "translate-x-full bg-red-700"}`}
                    />

                    {["BUY", "SELL"].map((type, idx) => (
                        <button
                            key={type}
                            onClick={() => setSide(type)}
                            className="flex-1 relative z-10 py-2 text-sm font-semibold text-gray-900 dark:text-gray-200"
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>



            <div className="px-6 py-4 space-y-4 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-400">Market Price</span>
                    <span className="font-medium">{price ? `$${price.toFixed(2)}` : "--"}</span>
                </div>

                <div className="space-y-1">
                    <label className="text-gray-400">Quantity</label>
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="0"
                        className={`w-full rounded-md px-3 py-2 border outline-none
              ${darkMode
                                ? "bg-black border-gray-700 text-white"
                                : "bg-white border-gray-300"
                            }`}
                    />
                </div>
            </div>


            <div className="px-6 py-4 border-t border-gray-700/40 space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-400">
                        {side === "BUY" ? "Estimated Cost" : "Estimated Credit"}
                    </span>
                    <span className="font-semibold">${tradeValue.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-400">Available Balance</span>
                    <span>${balance.toFixed(2)}</span>
                </div>

                {insufficient && (
                    <p className="text-xs text-red-500">
                        Insufficient balance for this order
                    </p>
                )}
            </div>


            <div className="px-20 pb-6 mt-auto">
                <button
                    disabled={qty <= 0 || insufficient}
                    className={`w-full py-3 rounded-lg font-semibold transition
            ${qty <= 0 || insufficient
                            ? "bg-gray-400 cursor-not-allowed"
                            : side === "BUY"
                                ? "bg-green-800 hover:bg-green-700 text-white"
                                : "bg-red-800 hover:bg-red-700 text-white"
                        }`}
                >
                    {side} {symbol}
                </button>
            </div>
        </div>
    );
};

export default TradePanel;
