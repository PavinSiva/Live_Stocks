import { MoonIcon } from '@heroicons/react/24/solid'
import React, { useContext } from 'react'
import ThemeContext from '../context/ThemeContext'

const ThemeIcon = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <button
      className={`rounded-lg border border-neutral-400 p-2 shadow-lg 
                  ${darkMode ? "shadow-gray-800" : "shadow-gray-300"} 
                  ml-6`}  // <-- margin to push it away from cards
      onClick={toggleDarkMode}
    >
      <MoonIcon
        className={`h-6 w-6 cursor-pointer stroke-1  
                    ${darkMode 
                      ? "fill-yellow-400 stroke-yellow-400" 
                      : "fill-none stroke-neutral-400"}`}
      />
    </button>
  )
}

export default ThemeIcon
