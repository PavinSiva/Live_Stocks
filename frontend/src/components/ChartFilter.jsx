import React, { useContext } from 'react'
import ThemeContext from '../context/ThemeContext'

const ChartFilter = ({ text, active, onClick }) => {
    const {darkMode} = useContext(ThemeContext)
  return (
    <button
      onClick={onClick}
      className={`w-10 m-1 h-6 border rounded-md flex items-center justify-center cursor-pointer transition-colors duration-200
        ${active
          ? "bg-indigo-600 border-indigo-700 text-gray-100"
          : darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-neutral-200 text-neutral-400"
        }
        `}
    >
      {text}
    </button>
  )
}

export default ChartFilter
