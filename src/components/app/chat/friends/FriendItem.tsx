import React from "react";
import Link from 'next/link'

type FriendItemProps = {
  user : {
  username: string;
  discriminator: string;
  avatar: string;
  id: string;
  };
};

export default function FriendItem(friendItemProps : FriendItemProps) {
  return (
    <li className="friend-item">
      <Link href={`/app/channels/@me/${friendItemProps.user.id}`}>
        <span>{friendItemProps.user.avatar}</span>
        {friendItemProps.user.username + "#" + friendItemProps.user.discriminator}
      </Link>
    </li>
  );
}
