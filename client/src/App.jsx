import { useState,useEffect } from 'react'
import './App.css'
import MainContainer from './Componenets/MainContiner/MainContainer';
import Login from './Componenets/Login/Login';
import { Route,Routes, useNavigate } from 'react-router-dom';
import Welcome from './Componenets/Welcome/Welcome';
import ChatArea from './Componenets/ChatArea/ChatArea';
import Users from './Componenets/Users/Users';
import CreateGroups from './Componenets/CreateGroups/CreateGroups';
import Groups from './Componenets/Groups/Groups';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  
function App() {
  
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/app' element={<MainContainer />}>
          <Route path='' element={<Welcome />}></Route>
          <Route path='chat' element={<ChatArea />}></Route>
          <Route path='users' element={ <Users />}></Route>
          <Route path='create-groups' element={ <CreateGroups />}></Route>
          <Route path='groups' element={ <Groups />} />
        </Route>
        <Route path='*' element={ <h1>Page not found</h1>} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
