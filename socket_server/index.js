import express from "express";
import { Server } from "socket.io";
const app = express();

app.get("/api/socket-test", (req, res) => {
  if (!res.socket) {
      res.end();
      return;
  }
  let socket = res.socket;

  const io = new Server(socket.server, {
      path: "/api/socket.io",
      addTrailingSlash: false,
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
      // console.log("Socket connected: " + socket.id);
      // socket.on("send-message", (obj) => {
      //     io.emit("receive-message", obj);
      // });
      socket.on('disconnect', function(){
          // console.log("client has disconnected:"+socket.id);
      });
  });

  // console.log("Setting up socket");
  res.end();
});


app.listen(3000, () => {
  // console.log("Server running on port 3000");
});