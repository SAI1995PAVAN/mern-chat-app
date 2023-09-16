import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from './Context/ThemeProvider.jsx';
import LoadingProvider from './Context/LoadingProvider.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <BrowserRouter>

    <ThemeProvider>
      <LoadingProvider>
         <App /> 
      </LoadingProvider>
    
    </ThemeProvider>
  </BrowserRouter>
   
  // </React.StrictMode>,
)
