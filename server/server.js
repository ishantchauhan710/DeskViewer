const express = require("express");
const app = express();

const ExpressPeerServer = require("peer").ExpressPeerServer;

const server = require("http").createServer(app);

app.use(
  "/peerjs",
  ExpressPeerServer(server, {
    debug: true,
  })
);

server.listen(5000, "127.0.0.1");
