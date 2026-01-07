import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AppSidebar from "../components/AppSidebar";
import CommoditiesCard from "../components/CommoditiesCard";
import { getStocksData } from "../helper/fetchStocksData";
import StockContext from "../context/StockContext";

import gold from "../assets/icons/gold-bars.png";
import silver from "../assets/icons/silver-bars.png";
import platinum from "../assets/icons/platinum.png";
import palladium from "../assets/icons/palladium.png";
import oilIcon from "../assets/icons/crude-oil.png";
import brentOil from "../assets/icons/brent-oil.png";
import naturalGas from "../assets/icons/natural-gas.png";
import heatingOil from "../assets/icons/heating-oil.png";
import gasoline from "../assets/icons/gasoline.png";
import copper from "../assets/icons/copper.png";
import aluminium from "../assets/icons/aluminum.png";
import wheat from "../assets/icons/wheat.png";
import corn from "../assets/icons/corn.png";
import soyBeans from "../assets/icons/soy-beans.png";
import oats from "../assets/icons/oats.png";
import rice from "../assets/icons/rice.png";
import coffee from "../assets/icons/coffee-beans.png";
import cocoa from "../assets/icons/cocoa.png";
import sugar from "../assets/icons/sugar-cube.png";
import cotton from "../assets/icons/cotton.png";
import orange from "../assets/icons/orange.png";
import cattle from "../assets/icons/cattle.png";
import meat from "../assets/icons/pork.png";
import chicken from "../assets/icons/chicken.png";


export default function Commodities() {
    const navigate = useNavigate();
    const { setStockSymbol } = useContext(StockContext);

    const [energy, setEnergy] = useState([]);
    const [preciousMetals, setPreciousMetals] = useState([]);
    const [industrialMetals, setIndustrialMetals] = useState([]);
    const [grains, setGrains] = useState([]);
    const [softs, setSofts] = useState([]);
    const [livestock, setLivestock] = useState([]);
    const [loading, setLoading] = useState(true);

    // -------------------------
    // 🔹 Define arrays for symbols
    // -------------------------
    const energySymbols = [
        { name: "Crude Oil (WTI)", symbol: "CL=F", icon: oilIcon },
        { name: "Brent Crude Oil", symbol: "BZ=F", icon: brentOil },
        { name: "Natural Gas", symbol: "NG=F", icon: naturalGas },
        { name: "Heating Oil", symbol: "HO=F", icon: heatingOil },
        { name: "Gasoline RBOB", symbol: "RB=F", icon: gasoline },
    ];

    const preciousMetalsSymbols = [
        { name: "Gold", symbol: "GC=F", icon: gold },
        { name: "Silver", symbol: "SI=F", icon: silver },
        { name: "Platinum", symbol: "PL=F", icon: platinum },
        { name: "Palladium", symbol: "PA=F", icon: palladium },
    ];

    const industrialMetalsSymbols = [
        { name: "Copper", symbol: "HG=F", icon: copper },
        { name: "Aluminum", symbol: "ALI=F", icon: aluminium },
        // { name: "Zinc", symbol: "ZNC=F" },
        // { name: "Nickel", symbol: "NIKL=F" },
        // { name: "Lead", symbol: "LEAD=F" },
        // { name: "Iron Ore", symbol: "IRORE=F" },
    ];

    const grainsSymbols = [
        { name: "Wheat", symbol: "ZW=F", icon: wheat },
        { name: "Corn", symbol: "ZC=F", icon: corn },
        { name: "Soybeans", symbol: "ZS=F", icon: soyBeans },
        { name: "Oats", symbol: "ZO=F", icon: oats },
        { name: "Rough Rice", symbol: "ZR=F", icon: rice },
    ];

    const softsSymbols = [
        { name: "Coffee", symbol: "KC=F", icon: coffee },
        { name: "Cocoa", symbol: "CC=F", icon: cocoa },
        { name: "Sugar", symbol: "SB=F", icon: sugar },
        { name: "Cotton", symbol: "CT=F", icon: cotton },
        { name: "Orange Juice", symbol: "OJ=F", icon: orange },
    ];

    const livestockSymbols = [
        { name: "Live Cattle", symbol: "LE=F", icon: cattle },
        { name: "Lean Hogs", symbol: "HE=F", icon: meat },
        { name: "Feeder Cattle", symbol: "GF=F", icon: chicken },
    ];

    // -------------------------
    // 🔹 Fetch each group separately
    // -------------------------
    useEffect(() => {
        const fetchGroup = async (symbolsArray, setState) => {
            const symbols = symbolsArray.map((c) => c.symbol);
            const data = await getStocksData(symbols);

            const merged = data.map((item) => {
                const symbolObj = symbolsArray.find(c => c.symbol === item.symbol); // define it here
                return {
                    ...item,
                    name: symbolObj?.name || item.name,
                    icon: symbolObj?.icon || null, // now this works
                };
            });
            console.log("merged", merged);

            setState(merged);
        };

        const fetchAll = async () => {
            setLoading(true);
            try {
                await Promise.all([
                    fetchGroup(preciousMetalsSymbols, setPreciousMetals),
                    fetchGroup(energySymbols, setEnergy),
                    fetchGroup(industrialMetalsSymbols, setIndustrialMetals),
                    fetchGroup(grainsSymbols, setGrains),
                    fetchGroup(softsSymbols, setSofts),
                    fetchGroup(livestockSymbols, setLivestock),
                ]);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, []);

    const handleCardClick = (symbol) => {
        setStockSymbol(symbol);
        navigate("/dashboard");
    };


    const renderSection = (title, items) => (
        <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map((item) => (

                    <CommoditiesCard
                        key={item.symbol}
                        ticker={item.symbol}
                        name={item.name}
                        icon={item.icon}
                        price={item.price}
                        change={item.change}
                        changePercent={item.changePercent}
                        history={item.history}
                        onClick={() => handleCardClick(item.symbol)}

                    />
                ))}
            </div>
        </section>
    );

    return (
        <div className="min-h-screen flex w-full bg-black">
            <AppSidebar />

            <main className="flex-1 flex flex-col overflow-hidden">

                <header className="h-16 border-b border-zinc-800 bg-black shadow-sm">
                    <div className="flex h-full items-center justify-between px-6">
                        <h1 className="text-xl font-semibold text-white">Commodities</h1>
                        <div className="flex items-center gap-2 text-sm">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-white">Live Data</span>
                        </div>
                    </div>
                </header>

                <div className="space-y-10 p-6">
                    {loading ? (
                        <div className="flex flex-col items-center mt-6">
                            <div className="w-6 h-6 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-white text-sm mt-2">Loading...</p>
                        </div>
                    ) : (
                        <>
                            {renderSection("Precious Metals", preciousMetals)}
                            {renderSection("Energy", energy)}
                            {renderSection("Grains", grains)}
                            {renderSection("Industrial Metals", industrialMetals)}
                            {renderSection("Softs", softs)}
                            {renderSection("Livestock", livestock)}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}
