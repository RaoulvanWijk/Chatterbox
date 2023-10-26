
import LogoutButton from '@/components/auth/LogoutButton'
import "@resources/styles/pages/app.scss"
import Sidenav from '@/components/app/nav/Sidenav'
import FriendslistNav from '@/components/app/nav/FriendslistNav'
import Chat from '@/components/app/chat/Chat'
import ChatUsers from '@/components/app/chat/ChatUsers'


export default function page(id: any) {
  return (
    <main className="appBackground">
      {id.channel}
      <Sidenav />
      <FriendslistNav />
      <Chat channel="@me" chat={id} />
      <ChatUsers />
    </main>
  )
}
