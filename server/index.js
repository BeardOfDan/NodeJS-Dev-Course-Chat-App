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

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

const users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('\nNew user connected');

  socket.on('join', (params, callback) => {
    if (!(isRealString(params.name) && isRealString(params.room))) {
      callback('Name and room name are required!');
    } else {

      socket.join(params.room);

      // incase if they are still in another room
      users.removeUser(socket.id);

      users.addUser(socket.id, params.name, params.room);

      io.to(params.room).emit('updateUserList', users.getUserList(params.room));

      socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
      socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

      callback();
    }
  });

  socket.on('createMessage', (data, callback) => {
    console.log('createMessage');
    console.log(JSON.stringify(data, undefined, 2));

    io.emit('newMessage', generateMessage(data.from, data.text));

    // acknowledge the event
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('A user has disconnected');

    const user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
  });
});

server.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});
