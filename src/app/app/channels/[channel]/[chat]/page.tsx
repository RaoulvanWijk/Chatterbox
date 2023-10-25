"use client"
import { useEffect } from 'react'
import { io, Socket } from 'socket.io-client'

import LogoutButton from '@/components/auth/LogoutButton'
import "@resources/styles/pages/app.scss"
import Sidenav from '@/components/app/nav/Sidenav'
import FriendslistNav from '@/components/app/nav/FriendslistNav'
import Chat from '@/components/app/chat/Chat'
import ChatUsers from '@/components/app/chat/ChatUsers'


export default function page() {
  let socket: any
  async function socketInitializer() {
    await fetch("/api/socket");
    console.log("socket initialized");

    socket = io('http://ryvanwijk.nl:3000/', {
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



  return (
    <main className="appBackground">
      <Sidenav />
      <FriendslistNav />
      <Chat />
      <ChatUsers />
    </main>
  )
}
