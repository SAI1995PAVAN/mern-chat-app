import React from 'react'

const MessageSelf = () => {
    const data = {
        name: 'You',
        message:'How r ussssssssssssssssss'
    }
  return (
      <div className='message-self-container'>
          <div className='self-message-box'>
              <p className='your-name'>{data.name}</p>
              <p className='your-message'>{data.message}</p>
              <p className='your-timestamp'>5:01am</p>
          </div>
    </div>
  )
}

export default MessageSelf