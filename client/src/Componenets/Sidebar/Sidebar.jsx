import React, { useState }  from 'react'
import '../MyStyles/MyStyles.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';
import SearchIcon from '@mui/icons-material/Search';
import ConversationsItem from '../ConversationsItem/ConversationsItem';
import { useNavigate } from 'react-router-dom';
import { themeState } from '../../Context/ThemeProvider';
import Tooltip from '@mui/material/Tooltip';


const Sidebar = () => {

  const [conversations, setConversations] = useState([
    {
      id:1,
      name: "Test1",
      lastMessage: 'Test 1 last Message',
      timestamp:'today'
    },
    {
      id:2,
      name: 'Test2',
      lastMessage: 'Tett2 last Message',
      timestamp:'today'
    },
    {
      id:3,
      name: "Test3",
      lastMessage: 'Test 3 last Message',
      timestamp:"today"
    },

  ])

  const { theme, setTheme } = themeState();

  const navigate = useNavigate()

  const handleLogOut = () => {
    localStorage.removeItem('userData')
    navigate('/')
  }
  
  return (
    <div className='sidebar-container'>
      <div className='sidebar-header'>
        <Tooltip title='logout'>
        <IconButton onClick={handleLogOut}>
          <AccountCircleIcon />
          </IconButton>
          </Tooltip>  
        <div className='sidebar-header-settings'>
          <IconButton onClick={()=>{navigate('/app/users')}}>
            <PersonAddIcon />
          </IconButton>
          <IconButton  onClick={()=>{navigate('/app/groups')}}>
            <GroupAddIcon />
          </IconButton>
            <IconButton  onClick={()=>{navigate('/app/create-groups')}}>
          <AddCircleIcon />
            </IconButton>
          <IconButton onClick={() => { setTheme(!theme) }}>
            <NightlightIcon/>
           </IconButton>
          </div>
      </div>
      <div className='sidebar-search'>
        <IconButton>
           <SearchIcon />
        </IconButton>
        <input
          placeholder='search'
          className='sidebar-searchbox'
        />

      </div>
      <div className='sidebar-conversations'>
        {conversations.map((each) => {
          return <ConversationsItem key={each.id} props={each}  />
        })}
      </div>
    </div>
  )
}

export default Sidebar;