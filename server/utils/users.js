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
    const newUser = new User(id, name, room);
    this.list.push(newUser);

    return newUser;
  }

  removeUser(id) {

  }

  getUser(id) {

  }

  getUserList(room) {

  }
}

module.exports = {
  User,
  Users
};
