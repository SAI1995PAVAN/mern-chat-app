import React,{useState,useContext,useEffect} from 'react'
import { createContext } from 'react';

const LoadingContext = createContext();

const LoadingProvider = ({children}) => {
  const [loading, setLoading] = useState(false);


  return (
    <LoadingContext.Provider value={{loading,setLoading}}>
      {children}
    </LoadingContext.Provider>
  )
}

export default LoadingProvider;

export const loadingState = () => {
  return useContext(LoadingContext)
}