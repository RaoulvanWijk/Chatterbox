import { Server } from "socket.io";
import type { NextApiRequest, NextApiResponse } from 'next'

export default function SocketHandler(req: NextApiRequest,
    res: NextApiResponse) {
        if (!res.socket) {
            res.end();
            return;
        }
        let socket = res.socket as any;

        const io = new Server(socket.server, {
            path: "/api/socket.io",
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
            },
        });

        if (!socket.server.io) {
            socket.server.io = io;
        }
        res.end();

    io.on("connection", (socket) => {
        console.log("Socket connected");
        // socket.on("send-message", (obj) => {
        //     io.emit("receive-message", obj);
        // });
    });

    console.log("Setting up socket");
    res.end();
}