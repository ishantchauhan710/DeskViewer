const express = require("express");
const app = express();
const ExpressPeerServer = require("peer").ExpressPeerServer;
const socketIo = require("socket.io");
const server = require("http").createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

app.use(
  "/peerjs",
  ExpressPeerServer(server, {
    debug: true,
  })
);

io.on("connection", function (socket) {
  //console.log("Made socket connection");
  socket.on("join", function (data) {
    console.log("User joined " + data);
  });
});

server.listen(5000, "127.0.0.1");
