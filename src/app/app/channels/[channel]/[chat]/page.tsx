
import LogoutButton from '@/components/auth/LogoutButton'
import "@resources/styles/pages/app.scss"
import Sidenav from '@/components/app/nav/Sidenav'
import FriendslistNav from '@/components/app/nav/FriendslistNav'
import Chat from '@/components/app/chat/Chat'
import ChatUsers from '@/components/app/chat/ChatUsers'
import { cookies } from 'next/headers'

type ChatProps = {
  params: {
    channel: string;
    chat: string;
  }
};

const getMessages = async (chatID: string): Promise<[]> => {  
  const data = await fetch(process.env.SERVER_URL + "/api/chat/getMessages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + cookies().get("authToken")?.value,
    },
    body: JSON.stringify({
      chatId: chatID,
    }),
  });
  const msgs = await data.json();

  return msgs.messages;
};

export default async function page(id: ChatProps) {
  const msgs = await getMessages(id.params.chat)
  
  return (
    <main className="appBackground">
      <Sidenav />
      <FriendslistNav />
      <Chat chatProps={id} msgs={msgs} />
      <ChatUsers />
    </main>
  )
}
