"use strict";

let socket = io();

socket.on("connect", function() {
  console.log("Connected to the server");

  // emmit stuff after connected


});

socket.on("disconnect", function() {
  console.log("Disconnected from the server")
});

socket.on("newMessage", function(message) {
  console.log("newMessage", JSON.stringify(message, undefined, 2));
});