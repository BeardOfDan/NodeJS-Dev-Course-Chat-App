'use strict';

// helper function
const printEventData = (eventName, eventData) => {
  console.log('\n' + eventName);
  console.log(JSON.stringify(eventData, undefined, 2));
};

const socket = io();

socket.on('connect', () => {
  console.log('Connected to the server');

  socket.on('newMessage', (message) => {
    printEventData('newMessage', message);

    // create a new List Item to display the new message
    let li = jQuery("<li></li>");
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
  });

  socket.on('newUserJoined', (data) => {
    printEventData('newUserJoined', data);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from the server');
  });
});

jQuery('#messageForm').on('submit', (e) => {
  e.preventDefault();

  socket.emit('createMessage', {
    'from': 'User',
    'text': jQuery('[name=message]').val()
  }, () => { 'Obligatory acknowledgment callback function'; });
});
