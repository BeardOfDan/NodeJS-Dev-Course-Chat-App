'use strict';

const expect = require('expect');

const { User, Users } = require('./users');

describe('Users', () => {

  let users;

  beforeEach(() => {
    users = new Users();

    users.addUser(0, 'Alpha', 'Here');
    users.addUser(1, 'Beta', 'There');
    users.addUser(2, 'Gamma', 'Here');
  });

  it('should add a new user', () => {
    const users = new Users();
    const user = new User(123, 'Dan', 'Here');

    const responseUser = users.addUser(user.id, user.name, user.room);

    expect(users.list).toEqual([user]);
  });

  it('should remove a user', () => {
    const userIds = [0, 1, 2];

    for (let i = 0; i < userIds.length; i++) {
      const thisId = userIds[i];

      const before = users.list.length;
      const user = users.removeUser(thisId);

      // returned the user
      expect(user.id).toBe(thisId);

      // removed exactly one user
      expect(users.list.length).toBe(before - 1);

      // removed the correct user
      expect(users.getUser(thisId)).toBe(null);
    }
  });

  it('should not remove a user', () => {
    const userIds = [-1, 3, 'one'];

    for (let i = 0; i < userIds.length; i++) {
      const thisId = userIds[i];

      const before = users.list.length;
      const user = users.removeUser(thisId);

      // returned null
      expect(user).toBe(null);

      // removed exactly no users
      expect(users.list.length).toBe(before);
    }
  });

  it('should find user', () => {
    const userIds = [0, 1, 2];

    for (let i = 0; i < userIds.length; i++) {
      const thisId = userIds[i];

      const before = users.list.length;
      const user = users.getUser(thisId);

      // returned the user
      expect(user.id).toBe(thisId);

      // the user is still there
      expect(users.getUser(thisId)).toBe(user);

      // no users were removed
      expect(users.list.length).toBe(before);
    }
  });

  it('should not find a user', () => {
    const userIds = [-1, 3, '1', 'one'];

    for (let i = 0; i < userIds.length; i++) {
      const userId = userIds[i];
      const user = users.getUser(userId);

      expect(user).toBe(null);
    }
  });

  it('should return names for the room \'Here\'', () => {
    const userList = users.getUserList('Here');

    expect(userList).toEqual(['Alpha', 'Gamma']);
  });

  it('should return names for the room \'There\'', () => {
    const userList = users.getUserList('There');

    expect(userList).toEqual(['Beta']);
  });
});
