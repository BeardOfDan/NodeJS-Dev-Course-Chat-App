'use strict';

// helper function
const printEventData = (eventName, eventData) => {
  console.log(eventName);
  console.log(JSON.stringify(eventData, undefined, 2));
};

const socket = io();

socket.on('connect', () => {
  console.log('Connected to the server');

  socket.on('newMessage', (data) => {
    printEventData('newMessage', data);
  });

  socket.on('newConnection', (data) => {
    printEventData('newConnection', data);
  });

  socket.on('newUserJoined', (data) => {
    printEventData('newUserJoined', data);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from the server');
  });
});


