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

  socket.on("createMessage", (newMessage) => {
    console.log("createMessage", JSON.stringify(newMessage, undefined, 2));
  });

  // ===================
  // === socket.emit ===
  // ===================

  socket.emit("newMessage", {
    from: "John",
    text: "This is a new message",
    createdAt: new Date()
  });

});

server.listen(PORT, () => {
  console.log(`\nListening on port ${PORT}`);
});


