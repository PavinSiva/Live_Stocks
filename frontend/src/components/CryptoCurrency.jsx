import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AppSidebar from "../components/AppSidebar";
import CryptoCard from "../components/CryptoCard";
import { getStocksData } from "../helper/fetchStocksData";
import StockContext from "../context/StockContext";
import chia from "../assets/icons/chia.svg"
import theta from "../assets/icons/theta.svg"
import ontology from "../assets/icons/ontology.svg"
import icon from "../assets/icons/icon.svg"
import amp from "../assets/icons/amp.svg"
import arweave from "../assets/icons/arweave.svg"
import zilliqa from "../assets/icons/zilliqa.svg"
import raven from "../assets/icons/raven.svg"
import neo from "../assets/icons/neo.svg"
import iota from "../assets/icons/iota.svg"
import bitcoinsv from "../assets/icons/bitcoinsv.svg"
import yearn from "../assets/icons/yearn.svg"
import sushi from "../assets/icons/sushi.svg"
import hedera from "../assets/icons/hedera.svg"
import vechain from "../assets/icons/vechain.svg"
import maultiverse from "../assets/icons/multiverse.svg"
import thetanet from "../assets/icons/thetanet.svg"
import kusama from "../assets/icons/kusama.svg"
import zcash from "../assets/icons/zcash.svg"
import enjin from "../assets/icons/enjin.svg"
import gold from "../assets/icons/gold.svg"
import qtum from "../assets/icons/qtum.svg"
import avalanche from "../assets/icons/avalanche.svg"
import decent from "../assets/icons/decent.svg"
import mina from "../assets/icons/mina.svg"




export default function Cryptocurrency() {
    const navigate = useNavigate();
    const { setStockSymbol } = useContext(StockContext);

    const [cryptoData, setCryptoData] = useState([]);
    const [loading, setLoading] = useState(true);

 const cryptoList = [
  { name: "Bitcoin", symbol: "BTC-USD", icon: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png" },
  { name: "Ethereum", symbol: "ETH-USD", icon: "https://assets.coingecko.com/coins/images/279/large/ethereum.png" },
  { name: "BNB", symbol: "BNB-USD", icon: "https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png" },
  { name: "XRP", symbol: "XRP-USD", icon: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png" },
  { name: "Tether", symbol: "USDT-USD", icon: "https://assets.coingecko.com/coins/images/325/large/Tether-logo.png" },
  { name: "USD Coin", symbol: "USDC-USD", icon: "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png" },
  { name: "Solana", symbol: "SOL-USD", icon: "https://assets.coingecko.com/coins/images/4128/large/solana.png" },
  { name: "Cardano", symbol: "ADA-USD", icon: "https://assets.coingecko.com/coins/images/975/large/cardano.png" },
  { name: "Dogecoin", symbol: "DOGE-USD", icon: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png" },
  { name: "Polkadot", symbol: "DOT-USD", icon: "https://assets.coingecko.com/coins/images/12171/large/polkadot.png" },
  { name: "Avalanche", symbol: "AVAX-USD", icon: avalanche},
  { name: "Litecoin", symbol: "LTC-USD", icon: "https://assets.coingecko.com/coins/images/2/large/litecoin.png" },
  { name: "Chainlink", symbol: "LINK-USD", icon: "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png" },
  { name: "Polygon", symbol: "MATIC-USD", icon: "https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png" },
  { name: "TRON", symbol: "TRX-USD", icon: "https://assets.coingecko.com/coins/images/1094/large/tron-logo.png" },
  { name: "Ethereum Classic", symbol: "ETC-USD", icon: "https://assets.coingecko.com/coins/images/453/large/ethereum-classic-logo.png" },
  { name: "Stellar", symbol: "XLM-USD", icon: "https://assets.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png" },
  { name: "Cosmos", symbol: "ATOM-USD", icon: "https://assets.coingecko.com/coins/images/1481/large/cosmos_hub.png" },
  { name: "Filecoin", symbol: "FIL-USD", icon: "https://assets.coingecko.com/coins/images/12817/large/filecoin.png" },
  { name: "NEAR Protocol", symbol: "NEAR-USD", icon: "https://assets.coingecko.com/coins/images/10365/large/near_icon.png" },
  { name: "Algorand", symbol: "ALGO-USD", icon: "https://assets.coingecko.com/coins/images/4380/large/download.png" },
  { name: "FTX Token", symbol: "FTT-USD", icon: "https://assets.coingecko.com/coins/images/9026/large/F.png" },
  { name: "Mina", symbol: "MINA-USD", icon: mina},
  { name: "ICP", symbol: "ICP-USD", icon: "https://assets.coingecko.com/coins/images/14495/large/Internet_Computer_logo.png" },
  { name: "Axie Infinity", symbol: "AXS-USD", icon: "https://assets.coingecko.com/coins/images/13029/large/axie_infinity_logo.png" },
  { name: "AAVE", symbol: "AAVE-USD", icon: "https://assets.coingecko.com/coins/images/12645/large/AAVE.png" },
  { name: "The Sandbox", symbol: "SAND-USD", icon: "https://assets.coingecko.com/coins/images/12129/large/sandbox_logo.jpg" },
  { name: "Decentraland", symbol: "MANA-USD", icon: decent},
  { name: "Curve DAO", symbol: "CRV-USD", icon: "https://assets.coingecko.com/coins/images/12124/large/Curve.png" },
  { name: "Tezos", symbol: "XTZ-USD", icon: "https://assets.coingecko.com/coins/images/976/large/Tezos-logo.png" },
  { name: "Hedera", symbol: "HBAR-USD", icon: hedera },
  { name: "VeChain", symbol: "VET-USD", icon: vechain },
  { name: "MultiversX", symbol: "EGLD-USD", icon: maultiverse },
  { name: "Theta", symbol: "THETA-USD", icon: thetanet },
  { name: "Kusama", symbol: "KSM-USD", icon: kusama },
  { name: "Zcash", symbol: "ZEC-USD", icon: zcash},
  { name: "Maker", symbol: "MKR-USD", icon: "https://assets.coingecko.com/coins/images/1364/large/Mark_Maker.png" },
  { name: "Synthetix", symbol: "SNX-USD", icon: "https://assets.coingecko.com/coins/images/3406/large/SNX.png" },
  { name: "Enjin Coin", symbol: "ENJ-USD", icon: enjin },
  { name: "Chiliz", symbol: "CHZ-USD", icon: "https://assets.coingecko.com/coins/images/8834/large/Chiliz.png" },
  { name: "Bitcoin Gold", symbol: "BTG-USD", icon: gold },
  { name: "Qtum", symbol: "QTUM-USD", icon: qtum },
  { name: "Dash", symbol: "DASH-USD", icon: "https://assets.coingecko.com/coins/images/19/large/dash-logo.png" },
  { name: "Zilliqa", symbol: "ZIL-USD", icon: zilliqa },
  { name: "Ravencoin", symbol: "RVN-USD", icon:raven },
  { name: "Bitcoin Cash", symbol: "BCH-USD", icon: "https://assets.coingecko.com/coins/images/780/large/bitcoin-cash-circle.png" },
  { name: "Monero", symbol: "XMR-USD", icon: "https://assets.coingecko.com/coins/images/69/large/monero_logo.png" },
  { name: "Neo", symbol: "NEO-USD", icon: neo },
  { name: "IOTA", symbol: "IOTA-USD", icon: iota },
  { name: "Bitcoin SV", symbol: "BSV-USD", icon: bitcoinsv },
  { name: "Basic Attention Token", symbol: "BAT-USD", icon: "https://assets.coingecko.com/coins/images/677/large/basic-attention-token.png" },
  { name: "Decred", symbol: "DCR-USD", icon: "https://assets.coingecko.com/coins/images/329/large/decred.png" },
  { name: "Waves", symbol: "WAVES-USD", icon: "https://assets.coingecko.com/coins/images/425/large/waves.png" },
  { name: "Yearn Finance", symbol: "YFI-USD", icon: yearn },
  { name: "SushiSwap", symbol: "SUSHI-USD", icon: sushi },
  { name: "Fantom", symbol: "FTM-USD", icon: "https://assets.coingecko.com/coins/images/4001/large/Fantom.png" },
  { name: "Chia", symbol: "XCH-USD", icon: chia },
  { name: "Theta Fuel", symbol: "TFUEL-USD", icon: theta},
  { name: "Ontology", symbol: "ONT-USD", icon: ontology},
  { name: "ICON", symbol: "ICX-USD", icon: icon },
  { name: "Amp", symbol: "AMP-USD", icon: amp },
  { name: "Arweave", symbol: "AR-USD", icon: arweave },
];



    useEffect(() => {
        const fetchCrypto = async () => {
            setLoading(true);
            try {
                const symbols = cryptoList.map(c => c.symbol);

                const data = await getStocksData(symbols);

                const merged = data.map(item => {
                    const ref = cryptoList.find(c => c.symbol === item.symbol);
                    return {
                        ...item,
                        name: ref?.name,
                        icon: ref?.icon
                    };
                });

                setCryptoData(merged);
            } finally {
                setLoading(false);
            }
        };

        fetchCrypto();
    }, []);

    const handleCardClick = (symbol) => {
        setStockSymbol(symbol);
        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen flex w-full bg-black">
            <AppSidebar />

            <main className="flex-1 flex flex-col overflow-hidden">

                <header className="h-16 border-b border-gray-800 bg-black shadow-sm">
                    <div className="flex h-full items-center justify-between px-6">
                        <h1 className="text-xl font-semibold text-white">Cryptocurrencies</h1>
                        <div className="flex items-center gap-2 text-sm">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-white">Live Data</span>
                        </div>
                    </div>
                </header>

                <div className="p-6">
                    {loading ? (
                        <div className="flex flex-col items-center mt-6">
                            <div className="w-6 h-6 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-white text-sm mt-2">Loading...</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4 items-start">
                            {cryptoData.map(item => (
                                <CryptoCard
                                    key={item.symbol}
                                    ticker={item.symbol}
                                    name={item.name}
                                    icon={item.icon}
                                    price={item.price}
                                    change={item.change}
                                    changePercent={item.changePercent}
                
                                    onClick={() => handleCardClick(item.symbol)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
