const express = require("express");
const app = express();
const socketIo = require("socket.io");
const server = require("http").createServer(app);
//const ExpressPeerServer = require("peer").ExpressPeerServer;
// app.use(
//   "/peerjs",
//   ExpressPeerServer(server, {
//     debug: true,
//   })
// );

const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", function (socket) {
  socket.on("join", function (data) {
    console.log("User joined " + data);
    // Create a room for client
    socket.join(data);
  });

  socket.on("remotedisconnected", ({ remoteId }) => {
    io.to("User" + remoteId).emit("remotedisconnected");
  });

  // ------ HANDLE MOUSE AND KEY EVENTS --------
  socket.on("mousemove", ({ userId, remoteId, event }) => {
    io.to("User" + remoteId).emit("mousemove", event);
  });

  socket.on("mousedown", ({ userId, remoteId, event }) => {
    io.to("User" + remoteId).emit("mousedown", event);
  });

  socket.on("scroll", ({ userId, remoteId, event }) => {
    io.to("User" + remoteId).emit("scroll", event);
  });

  socket.on("keydown", ({ userId, remoteId, event }) => {
    io.to("User" + remoteId).emit("keydown", event);
  });

  // socket.on("event", ({ userId, remoteId, event }) => {
  //   // Detect when user presses keys on his computer and tell the changes to other user
  //   console.log(`Event sent by ${userId} to ${remoteId}`);

  //   io.to("User"+remoteId).emit("action", event);
  //   //socket.broadcast.emit("action", event);
  // });
});

server.listen(5000, () => {
  console.log("Server started");
});
