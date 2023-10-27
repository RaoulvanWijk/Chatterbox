import { Server } from "socket.io";
import type { NextApiRequest, NextApiResponse } from 'next'
import { parseJWT } from "../../lib/auth/AuthValidation";
import { db } from "@/lib/db/index";
import { Chat } from "@/lib/db/models/chats";

export default function SocketHandler(req: NextApiRequest, res: NextApiResponse) {
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
        console.log('*First use, starting Socket.IO');
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
        socket.join('private:' + user?.userId)
        // socket.on("send-message", (obj) => {
        //     io.emit("receive-message", obj);
        // });

        socket.on('disconnect', function () {
            console.log("client has disconnected:" + socket.id);
        });

        socket.on("sendMessage", async (props) => {
            const user = await parseJWT(req.cookies.authToken as string);
            console.log(props);
            io.to("private:" + user?.userId).emit("recieveMessage", props.message)
        })

        // socket.once("setupChat", async (props) => {
        //     const chatM = new Chat(db);
        //     const messages = await chatM.getMessagesToUser(1, 2);
        //     io.to("private:" + user?.userId).emit("socketInit", messages)
        // })
    });
    
    res.end();
}