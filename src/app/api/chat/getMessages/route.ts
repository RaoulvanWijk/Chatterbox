import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/index";
import { Chat } from "@/lib/db/models/chats";
import { User } from "@/lib/db/models/user";
import { parseJWT } from "@/lib/auth/AuthValidation";

type props = {
    friendId: number,
}

export async function POST(request: NextRequest) {
    const body = await request.json()
    const chatM = new Chat(db);
    const userM = new User(db);

    const tkn = request.headers.get('Authorization')?.replace('Bearer ', '') ?? ''
    const usr = await parseJWT(tkn)
    const friend = await userM.getUserFromUserFriendsId(body.chatId, usr?.userId ?? 0)

    console.log(usr, friend);
    if(usr === undefined) {
        
        return NextResponse.json({ error: "Invalid token" })
    }
    const messages = await chatM.getMessagesToUser(1, friend.id);

    const msgs = messages.messages.map((msg: any) => {
        const usr = messages.uniqueUsers.find((user: any) => {
            return user.id === msg.message.fromUserId
        })
        return {
            username: usr.username,
            message: msg.message.message,
            date: msg.message.updatedAt ?? msg.message.createdAt,
        }
    })

    return NextResponse.json({ messages: msgs })
}