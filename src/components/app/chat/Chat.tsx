"use client"

import React, { useRef } from 'react'
import "@resources/styles/components/chat.scss"
import Message from './Message'
import { useEffect, use } from 'react'
import { io, Socket } from 'socket.io-client'
import { set } from 'zod'



export default function Chat({ chatProps, msgs }: any) {
  let socket = useRef<Socket | null>(null)
  
  let [messages, setMessages] = React.useState(msgs)

  useEffect(() => {
    // debugger
    socket.current = io('http://localhost:3000', {
      // transports: ["websocket", "polling"],
      // upgrade: false,
      path: "/api/socket",
      addTrailingSlash: false,
    });

    socket.current.on("recieveMessage", (data: any) => {
      console.log("message received", data, messages);
      // debugger
      setMessages([{ username: 'test', message: data, date: '2023-10-23T08:02:44.529Z' }, ...messages]);
    });

    console.log("socket initialized", socket);
    return () => {
      if (socket.current) {
        console.log("socket disconnected");

        socket.current.disconnect();
        socket.current = null;
      }

    };
  }, [socket, messages]);

  const sendMessage = (e: any) => {
    e.preventDefault()
    const message = e.target.message.value

    if (!socket.current) return console.log('socket not initialized')
    socket.current.emit('sendMessage', {
      chatProps,
      message
    })
    e.target.message.value = ''
  }

  const testMsg = { username: 'test', message: 'test', date: '2023-10-23T08:02:44.529Z' }
  return (
    <div className='chat-container'>
      <div className="active-chat-user app-layout-content">
        <p>Username#1234</p>
      </div>
      <div className="app-layout-content chat-content">
        <ul>
          {
            messages.map((msg, i) => {
              return <Message key={i} message={msg} />
            })
          }
        </ul>
      </div>
      <div className="app-layout-content chat-input">
        <form onSubmit={sendMessage}>
          <input name="message" id="" placeholder='Message Username#1234' />
        </form>
      </div>
    </div>
  )
}
