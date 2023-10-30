import { Server } from "socket.io";
import type { NextApiRequest, NextApiResponse } from "next";
import { parseJWT } from "../../lib/auth/AuthValidation";
import { db } from "@/lib/db/index";
import { Chat } from "@/lib/db/models/chats";
import { User } from "@/lib/db/models/user";

export default function SocketHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!res.socket) {
    res.end();
    return;
  }
  let socket = res.socket as any;
  if (!socket.server) {
    res.end();
    return;
  }

  if (!socket.io) {
    console.log("*First use, starting Socket.IO");
    const io = new Server(socket.server, {
      path: "/api/socket",
      addTrailingSlash: false,
      allowEIO3: true,
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
    socket.io = io;
    console.log("Socket server created: " + io.path());
  }
  const io = socket.io as Server;

  io.on("connection", async (socket) => {
    console.log("Socket connected: " + socket.id);
    const user = await parseJWT(req.cookies.authToken as string);
    // socket.join('private:' + user?.userId)
    // socket.on("send-message", (obj) => {
    //     io.emit("receive-message", obj);
    // });

    socket.on("disconnect", function () {
      console.log("client has disconnected:" + socket.id);
    });

    socket.on("sendMessage", async (props) => {
      const user = await parseJWT(req.cookies.authToken as string);
        console.log(props, user);
        const chatM = new Chat(db);
        const userM = new User(db);
        const friend = await userM.getUserFromUserFriendsId(props.chatProps.chat, user?.userId ?? 0)
        
        const messageToSave = {
            fromUserId: user?.userId ?? 0,
            toUserId: friend?.id ?? 0,
            message: props.message.message,
        }
        await chatM.sendMessage(messageToSave);

        const message = {
            message : props.message.message,
            username: user?.username ?? "unknown",
            date: new Date().toISOString(),
        }
      io.to("private:" + props.chatProps.chat).emit("recieveMessage", message);
    });

    socket.on("joinRoom", async (roomId) => {
      socket.join("private:" + roomId);
    });

    // socket.once("setupChat", async (props) => {
    //     const chatM = new Chat(db);
    //     const messages = await chatM.getMessagesToUser(1, 2);
    //     io.to("private:" + user?.userId).emit("socketInit", messages)
    // })
  });

  res.end();
}
