var JSON = require('circular-json');

class UserManager {
  constructor() {
    this.users = []
  }
  connect (user) {
    user.user.roomId = null
    this.users.push(user)
  }
  disconnect (id) {
    this.users.forEach((user, i) => {
      if (user.id === id) this.users.splice(i, 1)
    })
  }
  getUserById (id) {
    let userFound = null;
    this.users.forEach((user, i) => {
      if (user.id === id) userFound = user
    })
    return userFound;
  }
  updateRoom (id, roomId) {
    this.users.forEach((user, i) => {
      if (user.id === id) {
        this.users[i].user.roomId = roomId
      }
    })
  }
  getRoom (id) {
    this.users.forEach((user, i) => {
      if (user.id === id) return this.users[i].user.roomId
    })
  }
  toString () {
    let result = []
    this.users.forEach(user => result.push(user.user))
    return JSON.stringify(result);
  }
}
module.exports = {UserManager: UserManager}
