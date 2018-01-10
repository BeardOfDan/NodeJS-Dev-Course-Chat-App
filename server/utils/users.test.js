'use strict';

const expect = require('expect');

const { User, Users } = require('./users');

describe('Users', () => {
  it('should add a new user', () => {
    const users = new Users();
    const user = new User(123, 'Dan', 'Here');

    const responseUser = users.addUser(user.id, user.name, user.room);

    expect(users.list).toEqual([user]);
  });
});
