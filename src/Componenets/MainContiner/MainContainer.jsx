import React from 'react'
import '../MyStyles/MyStyles.css'
import Sidebar from '../Sidebar/Sidebar';
import WorkArea from '../WorkArea/WorkArea';

const MainContainer = () => {
  return (
      <div className='main-container'>
          <Sidebar />
          <WorkArea />
      </div>
  )
}

export default MainContainer