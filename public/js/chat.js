'use strict';

const socket = io();

const scrollToBottom = () => {
  // selectors
  const messages = jQuery('#messages');
  const newMessage = messages.children('li:last-child');
  // heights
  const clientHeight = messages.prop('clientHeight');
  const scrollTop = messages.prop('scrollTop');
  const scrollHeight = messages.prop('scrollHeight');
  const newMessageHeight = newMessage.innerHeight();
  const lastMessageHeight = newMessage.prev().innerHeight();

  if ((clientHeight + scrollTop + newMessageHeight + lastMessageHeight) >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
};

socket.on('connect', () => {
  console.log('Connected to the server');

  const params = jQuery.deparam(window.location.search);

  socket.emit('join', params, (err) => {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {

    }
  });

  socket.on('newMessage', (message) => {
    const formattedTime = moment(message.createdAt).format('h:mm a');
    const template = jQuery('#message-template').html();
    const html = Mustache.render(template, {
      'text': message.text,
      'from': message.from,
      'createdAt': formattedTime
    });

    jQuery('#messages').append(html);

    scrollToBottom();
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

    scrollToBottom();
  });

  socket.on('updateUserList', (users) => {
    const ol = jQuery('<ol></ol');

    for (let i = 0; i < users.length; i++) {
      ol.append(jQuery('<li></li>').text(users[i]));
    }

    jQuery('#users').html(ol);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from the server');
  });
});

jQuery('#messageForm').on('submit', (e) => {
  e.preventDefault();

  const messageTextBox = jQuery('[name=message]');

  socket.emit('createMessage', {
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
