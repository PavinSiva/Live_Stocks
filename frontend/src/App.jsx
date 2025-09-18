import { useState } from 'react'
import './App.css'
import Dashboard from './components/Dashboard'
import ThemeContext from './context/ThemeContext'
import StockContext from './context/StockContext'
import Signup from './components/Signup'

function App() {
  const [darkMode , setDarkMode] = useState(false)
  const [stockSymbol , setStockSymbol ] = useState("META")

  return (
    <>
      <ThemeContext.Provider value={{ darkMode , setDarkMode }}>
        <StockContext.Provider value={{stockSymbol , setStockSymbol}}>
          <Dashboard/>
        </StockContext.Provider>
      </ThemeContext.Provider>
    </>
  )
}

export default App
