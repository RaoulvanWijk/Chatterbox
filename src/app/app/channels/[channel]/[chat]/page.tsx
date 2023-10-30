
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

type getMessagesResponse = {
  messages: [];
  chatTitle: string;
};

const getMessages = async (chatID: string): Promise<getMessagesResponse> => {  
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

  return {
    messages: msgs.messages,
    chatTitle: msgs.friend.username + "#" + msgs.friend.tag,
    // chatTitle: msgs[0].chatTitle,
  };
};

export default async function page(id: ChatProps) {
  const res = await getMessages(id.params.chat)
  
  return (
    <main className="appBackground">
      <Sidenav />
      <FriendslistNav />
      <Chat chatProps={id} msgs={res.messages} chatTitle={res.chatTitle}/>
      <ChatUsers />
    </main>
  )
}
