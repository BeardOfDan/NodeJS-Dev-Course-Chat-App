'use strict';

// A helper class for Users
class User {
  constructor(id, name, room) {
    this.id = id;
    this.name = name;
    this.room = room;
  }
}

class Users {
  constructor() {
    this.list = [];
  }

  addUser(id, name, room) {
    // ensure that the user id is unique
    if (this._getIndex(id) !== null) {
      return null;
    }

    const newUser = new User(id, name, room);
    this.list.push(newUser);

    return newUser;
  }

  // a helper method
  _getIndex(id) {
    // TODO: Ensure that the list array is sorted by the user id
    //       This will allow me to do a binary search and have a time complexity of Log2(n)
    //       instead of linear

    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].id === id) {
        return i;
      }
    }

    return null;
  }

  removeUser(id) {
    const index = this._getIndex(id);

    if (index !== null) {
      return this.list.splice(index, 1)[0];
    } else {
      return null;
    }
  }

  getUser(id) {
    const index = this._getIndex(id);

    if (index !== null) {
      return this.list[index];
    } else {
      return null;
    }
  }

  getUserList(room) {
    const users = this.list.filter((user, index, list) => {
      return user.room === room;
    });


    return users.reduce((memo, user, list) => {
      memo.push(user.name);
      return memo;
    }, []);

  }
}

module.exports = {
  User,
  Users
};
