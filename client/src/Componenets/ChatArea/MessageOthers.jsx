import React from 'react'

const MessageOthers = () => {
    const data = {
        name: 'Random User',
        message:'This is sample message'
    }
  return (
    <div className='message-others-container'>
          <div className='message-conversation-container'>
              <p className='other-user-icon'>{ data.name[0]}</p>
              <div className='other-user-message'>
                  <p className='message-sender-name'>{ data.name}</p>
                  <p className='message-content'>{data.message}</p>
                  <p className='message-timestamp'>5:00am</p>
              </div>
        </div>
    </div>
  )
}

export default MessageOthers