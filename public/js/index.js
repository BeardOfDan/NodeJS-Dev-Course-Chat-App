'use strict';

// helper function
const printEventData = (eventName, eventData) => {
  console.log('\n' + eventName);
  console.log(JSON.stringify(eventData, undefined, 2));
};

const socket = io();

socket.on('connect', () => {
  console.log('Connected to the server');

  socket.on('newMessage', (data) => {
    printEventData('newMessage', data);
  });

  socket.on('newUserJoined', (data) => {
    printEventData('newUserJoined', data);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from the server');
  });
});

socket.emit('createMessage', {
  'from': 'Frank',
  'text': 'Hi'
}, (data) => {
  console.log('Got it', data);
});

jQuery('#messageForm').on('submit', (e) => {
  e.preventDefault();

  socket.emit('createMessage', {
    'from': 'User',
    'text': jQuery('[name=message]').val()
  }, () => { 'Obligatory acknowledgment callback function'; });
});
