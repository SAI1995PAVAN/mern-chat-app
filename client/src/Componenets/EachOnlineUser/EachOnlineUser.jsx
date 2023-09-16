import React from 'react';
import '../MyStyles/MyStyles.css';
import { motion } from "framer-motion";


const EachOnlineUser = (props) => {
  const { userDetails } = props
  console.log(props)
  return (
    <motion.div
      className='each-online-user'
      transition={{ delay: 1 }}
      onClick={ props.onClick }
    >
          <p className='each-online-user-icon'>{userDetails.username[0]}</p>
          <p className='each-online-user-name'>{ userDetails.username}</p>
    </motion.div>
  )
}

export default EachOnlineUser