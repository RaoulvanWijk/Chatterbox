"use client"

import React from 'react'
import "@resources/styles/components/chat.scss"
import Message from './Message'
import { useEffect } from 'react'
import { io, Socket } from 'socket.io-client'

export default function Chat() {

  let socket: any
  async function socketInitializer() {
    await fetch("/api/socket");
    console.log("socket initialized");

    socket = io('http://localhost:3000/', {
      path: "/api/socket.io",
    });
    console.log(socket);

    socket.on("receive-message", (data: any) => {
      // setAllMessages((pre) => [...pre, data]);
    });
    // return socket
  }

  useEffect(() => {
    (async () => {
      await socketInitializer();

      return () => {
        console.log(socket);

        socket.disconnect();
      };
    })()
  }, []);

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
