'use strict';

const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public/');
const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const { generateMessage } = require('./utils/message');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('\nNew user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newUserJoined', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (data, callback) => {
    console.log('createMessage');
    console.log(JSON.stringify(data, undefined, 2));

    io.emit('newMessage', generateMessage(data.from, data.text));

    callback('This is from the server');
  });

  socket.on('disconnect', () => {
    console.log('A user has disconnected');
  });
});

server.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});
