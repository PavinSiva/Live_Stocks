import { TrendingUp, TrendingDown } from "lucide-react";

export default function CryptoCard({
    icon,
    name,
    ticker,
    price,
    change,
    changePercent,
    onClick,
}) {
    const p = Number(price) || 0;
    const ch = Number(change) || 0;
    const chp = Number(changePercent) || 0;

    const isUp = ch > 0;

    return (
        <div
            onClick={onClick}
            className="
                w-full 
                bg-[#0d0d0d] 
                border border-zinc-900 
                rounded-2xl 
                px-4 py-3
                flex items-center 
                justify-between
                gap-4
                cursor-pointer
                hover:bg-[#131313]
                transition-all
            "
        >
            {/* LEFT: ICON + NAME + TICKER */}
            <div className="flex items-center gap-3 w-[220px]">
                <img
                    src={icon}
                    alt={name}
                    className="w-10 h-10 rounded-lg object-contain"
                />

                <div className="flex flex-col leading-tight">
                    <span className="text-white font-semibold text-sm">
                        {name}
                    </span>
                    <span className="text-gray-400 text-xs tracking-wide">
                        {ticker}
                    </span>
                </div>
            </div>

            {/* PRICE */}
            <div className="text-right w-[130px]">
                <p className="text-white font-bold text-base">
                    ${p.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
            </div>

            {/* TREND ICON */}
            <div className="w-[30px] flex justify-center">
                {isUp ? (
                    <TrendingUp className="w-5 h-5 text-green-400" />
                ) : (
                    <TrendingDown className="w-5 h-5 text-red-400" />
                )}
            </div>

            {/* CHANGE */}
            <div className="text-right w-[80px]">
                <p
                    className={`font-semibold text-sm ${
                        isUp ? "text-green-400" : "text-red-400"
                    }`}
                >
                    {isUp ? "+" : ""}
                    {ch.toFixed(2)}
                </p>
            </div>

            {/* CHANGE % */}
            <div className="w-[90px] flex justify-end">
                <span
                    className={`
                        px-2 py-1 rounded-lg text-xs font-bold
                        ${isUp ? "bg-green-900/40 text-green-300" : "bg-red-900/40 text-red-300"}
                    `}
                >
                    {isUp ? "+" : ""}
                    {chp.toFixed(2)}%
                </span>
            </div>
        </div>
    );
}
