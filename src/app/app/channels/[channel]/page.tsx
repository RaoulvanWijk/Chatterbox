import React from 'react'
import LogoutButton from '@/components/auth/LogoutButton'
import "@resources/styles/pages/app.scss"
import Sidenav from '@/components/app/nav/Sidenav'
import FriendslistNav from '@/components/app/nav/FriendslistNav'
import Chat from '@/components/app/chat/Chat'
import ChatUsers from '@/components/app/chat/ChatUsers'

const getMessages = async (): Promise<[]> => {  
  const data = await fetch(process.env.SERVER_URL + "/api/chat/getMessages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chatId: "0",
    }),
  });
  const msgs = await data.json();

  return msgs.messages;
};

export default async function page(id: any) {
  const msgs = await getMessages()
  console.log(id);

  return (
    <main className="appBackground">
      <Sidenav />
      <FriendslistNav />
      <Chat chatProps={id} msgs={msgs} />
      <ChatUsers />
    </main>
  )
}
