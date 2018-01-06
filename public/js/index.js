'use strict';

const socket = io();

socket.on('connect', () => {
  console.log('Connected to the server');

});

socket.on('newMessage', (data) => {
  console.log('newMessage');
  console.log(JSON.stringify(data, undefined, 2));
});

socket.on('disconnect', () => {
  console.log('Disconnected from the server');
});
