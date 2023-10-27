import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/index";
import { Chat } from "@/lib/db/models/chats";

type props = {
    friendId: number,
}

export async function POST(request: NextRequest) {
    const body = await request.json()
    const chatM = new Chat(db);
    const messages = await chatM.getMessagesToUser(1, 2);
    // console.log(messages.messages);

    const msgs = messages.messages.map((msg: any) => {
        // console.log(msg.message);
        const usr = messages.uniqueUsers.find((user: any) => {
            // console.log(user.id, msg);
            return user.id === msg.message.fromUserId
        })
        // console.log(usr, msg.message);
        return {
            username: usr.username,
            message: msg.message.message,
            date: msg.message.updatedAt ?? msg.message.createdAt,
        }
    })
    console.log(msgs);
    

    return NextResponse.json({ messages: msgs })
}