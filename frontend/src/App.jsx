import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import ThemeContext from "./context/ThemeContext";
import StockContext from "./context/StockContext";
import Signup from "./components/Signup";
import Login from "./components/Login";
import  Home  from "./components/Home";
import Stocks from "./components/Stocks";
import Commodities from "./components/Commodities";
import Cryptocurrency from "./components/CryptoCurrency";
import News from "./components/News"

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [stockSymbol, setStockSymbol] = useState("");

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/stocks" element={<Stocks />} />
            <Route path="/commodities" element={<Commodities />} />
            <Route path="/cryptocurrency" element={<Cryptocurrency />} />
            <Route path="/news" element={<News />} />
          </Routes>
        </Router>
      </StockContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
