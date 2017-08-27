"use strict";

const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "./../public/");
const PORT = process.env.PORT || 3000;

let app = express();
app.use(express.static(publicPath));

let server = http.createServer(app);
let io = socketIO(server);

io.on("connection", (socket) => {
  console.log("New user connected");

  // =================
  // === socket.on ===
  // =================

  socket.on("disconnect", () => {
    console.log("User was disconnected");
  });

  socket.on("createMessage", (message) => {
    console.log("createMessage", JSON.stringify(message, undefined, 2));

    io.emit("newMessage", {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

  // ===================
  // === socket.emit ===
  // ===================

});

server.listen(PORT, () => {
  console.log(`\nListening on port ${PORT}\n`);
});


