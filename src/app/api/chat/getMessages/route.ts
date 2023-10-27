import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/lib/db/index";
// import { Chat } from "@/lib/db/models/chats";

// type props = {
//     friendId: number,
// }

export async function POST(request: NextRequest) {
//     const body = await request.json()


//     const chatM = new Chat(db);
//     await chatM.sendMessage({
//         fromUserId: 1,
//         toUserId: 2,
//         message: 'test',
//         // timestamp: Date.now()
//     });
//     // const messages = await chatM.getMessagesToUser(1, 2);
//     console.log(messages);
    
    return NextResponse.json({ message: "Hello, world!"	 })
}