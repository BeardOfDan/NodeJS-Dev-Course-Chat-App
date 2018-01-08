const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    const from = 'Sender';
    const text = 'Example text';

    const message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');

    expect(message).toInclude({ from, text });
  });
});

describe('generateLocationMessage', () => {
  it('should generate the correct location object', () => {
    const from = 'Sender';
    const lat = 123;
    const lng = 456;

    // The url that should be generated
    const url = `https://www.google.com/maps/?q=${lat},${lng}`;

    const location = generateLocationMessage(from, lat, lng);

    expect(location.createdAt).toBeA('number');

    expect(location).toInclude({ from, url });
  });
});
