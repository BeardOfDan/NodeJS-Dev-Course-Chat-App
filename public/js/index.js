'use strict';

const socket = io();

socket.on('connect', () => {
  console.log('Connected to the server');

  socket.on('newMessage', (message) => {
    // create a new List Item to display the new message
    let li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
  });

  socket.on('newLocationMessage', (message) => {
    let li = jQuery('<li></li');
    let anchor = jQuery('<a target="_blank">My current location</a>');

    li.text(`${message.from}: `);
    anchor.attr('href', message.url);

    li.append(anchor);

    jQuery('#messages').append(li);
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

const locationButton = jQuery('#send-location');

locationButton.on('click', (e) => {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser!');
  }

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit('createLocationMessage', {
      'latitude': position.coords.latitude,
      'longitude': position.coords.longitude
    });
  }, (err) => {
    alert('Unable to fetch your location...');
  });
});
