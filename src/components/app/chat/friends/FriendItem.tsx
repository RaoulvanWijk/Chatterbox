import React from "react";
import Link from 'next/link'

export type FriendItemProps = {
  user : {
  username: string;
  tag: string;
  avatar: string | null;
  id: string;
  };
};

export default function FriendItem(friendItemProps : FriendItemProps) {
  return (
    <li className="friend-item">
      <Link href={`/app/channels/@me/${friendItemProps.user.id}`}>
        <span>{friendItemProps.user.avatar || 
        friendItemProps.user.username.split('')[0].toUpperCase()+friendItemProps.user.username.split('')[1].toUpperCase()
        }</span>
        {friendItemProps.user.username + "#" + friendItemProps.user.tag}
      </Link>
    </li>
  );
}
