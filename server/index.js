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

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('\nNew user connected');

  socket.emit('newMessage', {
    'from': 'Me',
    'text': 'Message text',
    'createdAt': Date.now()
  });

  socket.on('createMessage', (data) => {
    console.log('createMessage');
    console.log(JSON.stringify(data, undefined, 2));
  });

  socket.on('disconnect', () => {
    console.log('A user has disconnected');
  });
});

server.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});
