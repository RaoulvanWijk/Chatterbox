import React from 'react'

import "@resources/styles/components/chat.scss"

export default function Chat() {
  return (
    <div className='chat-container'>
      <div className="active-chat-user">
        <p>Username#1234</p>
      </div>
      <div className="app-layout-content chat-content"></div>
      <div className="app-layout-content chat-input">
        <input name="message" id="" placeholder='Message @Username#1234' />
      </div>
    </div>
  )
}
