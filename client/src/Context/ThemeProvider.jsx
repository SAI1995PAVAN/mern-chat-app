import React from 'react'
import { useContext, useState } from 'react';
import { createContext } from 'react';

const ThemeContext=createContext()

const ThemeProvider = ({children}) => {
    const[theme,setTheme]=useState(false)
  return (
      <ThemeContext.Provider value={{theme, setTheme}}>
          {children}
    </ThemeContext.Provider>
  )
}

export const themeState = () => {
    return useContext(ThemeContext)
}
export default ThemeProvider