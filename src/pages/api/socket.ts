import { Server } from "socket.io";
import type { NextApiRequest, NextApiResponse } from 'next'

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

    io.on("connection", (socket) => {
        console.log("Socket connected: " + socket.id);
        // socket.on("send-message", (obj) => {
        //     io.emit("receive-message", obj);
        // });
        socket.on('disconnect', function(){
            console.log("client has disconnected:"+socket.id);
        });
    });

    res.end();
}