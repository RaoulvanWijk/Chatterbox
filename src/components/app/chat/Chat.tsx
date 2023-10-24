import React from 'react'

import "@resources/styles/components/chat.scss"
import Message from './Message'

export default function Chat() {
  const testMsg = {username: 'test', message: 'test', date: '2023-10-23T08:02:44.529Z' }
  return (
    <div className='chat-container'>
      <div className="active-chat-user app-layout-content">
        <p>Username#1234</p>
      </div>
      <div className="app-layout-content chat-content">
        <ul>
          <Message message={testMsg} />
          <Message message={testMsg} />
        </ul>
      </div>
      <div className="app-layout-content chat-input">
        <input name="message" id="" placeholder='Message Username#1234' />
      </div>
    </div>
  )
}
