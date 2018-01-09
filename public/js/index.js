'use strict';

const socket = io();

socket.on('connect', () => {
  console.log('Connected to the server');

  socket.on('newMessage', (message) => {
    const formattedTime = moment(message.createdAt).format('h:mm a');
    const template = jQuery('#message-template').html();
    const html = Mustache.render(template, {
      'text': message.text,
      'from': message.from,
      'createdAt': formattedTime
    });

    jQuery('#messages').append(html);
  });

  socket.on('newLocationMessage', (message) => {
    const formattedTime = moment(message.createdAt).format('h:mm a');
    const template = jQuery('#location-message-template').html();
    const html = Mustache.render(template, {
      'url': message.url,
      'from': message.from,
      'createdAt': formattedTime
    });

    jQuery('#messages').append(html);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from the server');
  });
});

jQuery('#messageForm').on('submit', (e) => {
  e.preventDefault();

  const messageTextBox = jQuery('[name=message]');

  socket.emit('createMessage', {
    'from': 'User',
    'text': messageTextBox.val()
  }, () => {
    messageTextBox.val('');
  });
});

const locationButton = jQuery('#send-location');

locationButton.on('click', (e) => {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser!');
  }

  locationButton.attr('disabled', 'disabled').text('Sending Location...');

  navigator.geolocation.getCurrentPosition((position) => {
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage', {
      'latitude': position.coords.latitude,
      'longitude': position.coords.longitude
    }, () => {
    });
  }, (err) => {
    locationButton.removeAttr('disabled').text('Send Location');
    alert('Unable to fetch your location...');
  });
});
